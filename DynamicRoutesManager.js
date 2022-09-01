//  The problem is that I did have dynamic pages with things like `:id`, `:page`...etc
// and if someone decided to manipulate the url and enter a random id, the app would show the page but of course it would be broken.
// So I decided to create a wrapper component to manager to fetch the server and check  if the id is valid. You can tweak this code to your own needs..

export const DynamicRouteManager = ({ children, fetcher }) => {
  const flags = useRef({
    isFirstRender: true,
    didValidate: false,
  });
  const invalidRoutes = useRef([]);
  const params = useParams();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const isRouteValid = useCallback(async () => {
    setIsLoading(true);
    const req = await fetcher(params);
    flags.current = {
      ...flags.current,
      didValidate: true,
    };
    setIsLoading(false);
    if (!req.ok) {
      invalidRoutes.current.push(pathname);
      return setIsValid(false);
    }
    setIsValid(true);
  }, []);
  useEffect(() => {
    isRouteValid();
  }, []);

  useEffect(() => {
    if (flags.current.didValidate && flags.current.isFirstRender) {
      flags.current = {
        ...flags.current,
        isFirstRender: false,
      };
      // Now the user is using client routing instead of trying to tamper with the url ;)
      setIsValid(true);
    }
  }, [pathname]);
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (
    (!isValid && flags.current.isFirstRender) ||
    invalidRoutes.current.includes(pathname)
  ) {
    return <ErrorPage />;
  }
  return children;
};
