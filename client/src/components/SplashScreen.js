import Typography from "@mui/material/Typography";
import AuthContext from "../auth";
import Button from "@mui/material/Button";
import Copyright from "./Copyright";
import { Link } from "react-router-dom";
import GlobalStoreContext from "../store";
import { useContext } from "react";
export default function SplashScreen() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  return (
    <div id="splash-screen">
      <h3 id="splash-text">WELCOME TO T5L</h3>
      <h6 id="splash-subtext">Make your Top 5 List today!</h6>
      <div>
        <Link underline="none" to="/login/" style={{ textDecoration: "none" }}>
          <Button
            id="splash-button"
            variant="contained"
            size="large"
            style={{
              width: 300,
              height: 100,
              backgroundColor: "#d4d4f5",
              fontSize: "40px",
              fontWeight: "bold",
              borderRadius: "15px",
            }}
          >
            Login
          </Button>
        </Link>
        <Link
          underline="none"
          to="/register/"
          style={{ textDecoration: "none" }}
        >
          <Button
            id="splash-button"
            variant="contained"
            size="large"
            style={{
              width: 300,
              height: 100,
              backgroundColor: "#d4d4f5",
              fontSize: "40px",
              fontWeight: "bold",
              borderRadius: "15px",
            }}
          >
            Sign Up
          </Button>
        </Link>

        <Button
          id="splash-button"
          variant="contained"
          size="large"
          style={{
            width: 300,
            height: 100,
            backgroundColor: "#d4d4f5",
            fontSize: "40px",
            fontWeight: "bold",
            borderRadius: "15px",
          }}
          onClick={() => {
            auth.login({ isGuest: true }, store);
          }}
        >
          Guest
        </Button>
      </div>
      <h6
        style={{ fontSize: "30px", marginBlockStart: "3em" }}
        id="splash-subtext"
      >
        Create and share your Top 5 of anything! Rate and share your own lists,
        or rate and comment on other users lists. Join the community today!
      </h6>
      <Copyright sx={{ mt: 10 }} />
    </div>
  );
}
