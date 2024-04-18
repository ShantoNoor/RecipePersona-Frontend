import { Helmet } from "react-helmet-async";

const Title = ({ children }) => {
  return (
    <Helmet>
      <title>{children} | Recipe Persona</title>
    </Helmet>
  );
};

export default Title;
