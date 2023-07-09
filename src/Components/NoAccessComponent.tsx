interface NoAccessProps {
    text?: string;
  }
  
  const NoAccess: React.FC<NoAccessProps> = ({ text = 'You have to login' }) => {
    return <div>{text}</div>;
  };
  
  export default NoAccess;
  