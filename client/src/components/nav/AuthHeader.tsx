import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useUser } from "../../hooks/useUser";

export default function AuthHeader() {
  const { user, logout } = useUser();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#E8F1F2",
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="body1">{user?.name || ""}</Typography>
          <Button onClick={logout} sx={{ color: "black", marginLeft: "auto" }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
