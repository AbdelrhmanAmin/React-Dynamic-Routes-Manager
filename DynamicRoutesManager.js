//  The problem is that I did have dynamic pages with things like `:id`, `:page`...etc
// and if someone decided to manipulate the url and enter a random id, the app would show the page but of course it would be broken.
// So I decided to create a wrapper component to manager to fetch the server and check  if the id is valid. You can tweak this code to your own needs..

export const DynamicRouteManager = ({ children, fetcher }) => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const fetchToValidateRoute = async () => {
    setIsLoading(true);
    const req = await fetcher(params);
    setIsLoading(false);
    if (!req.ok) {
      return setIsValid(false);
    }
    setIsValid(true);
  };
  useEffect(() => {
    fetchToValidateRoute();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (!isValid) {
    return <ErrorPage />;
  }
  return children;
}
