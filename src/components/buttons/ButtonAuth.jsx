const ButtonAuth = ({ children }) => {
    return (
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        {children}
        </button>
    );
  };
export default ButtonAuth;