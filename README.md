# React-Dynamic-Routes-Manager
404 error boundary for Dynamic routes or I'd rather say: Server-side-like fetching before entering a route.

The problem is that I did have dynamic pages with params like `:id`, `:page`...etc
and if someone decided to manipulate the url and enter a random id, the app would show the page but of course it would be broken.
So I decided to create a manager component to fetch the server and check if the id is valid. You can tweak this code to your own needs..
