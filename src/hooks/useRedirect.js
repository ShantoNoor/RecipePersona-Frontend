import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useRedirect = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const redirect = () => {
    toast.info(
      "Please, update your preferences for getting better recommendations",
      {
        action: {
          label: "Update Preferences",
          onClick: () => navigate("/my-profile/preferences"),
        },
      }
    );

    if (state?.pathname) {
      return navigate(state.pathname, {
        state: { title: state.title },
      });
    } else {
      return navigate("/");
    }
  };

  return redirect;
};

export default useRedirect;
