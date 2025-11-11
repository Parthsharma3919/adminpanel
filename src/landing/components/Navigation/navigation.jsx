import * as React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import VSFoundationLogo from "./../logo/VSFoundationcopy.png";

const sections = [
  { label: "Features", href: "/#features" },
  { label: "Student", href: "/#JourneyTimeline" },
  { label: "College", href: "/#CollegesPage" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

function ElevationWrapper({ children }) {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 10 });
  return React.cloneElement(children, {
    elevation: trigger ? 3 : 0,
    sx: {
      ...children.props.sx,
      bgcolor: trigger ? "rgba(255,255,255,0.9)" : "transparent",
      backdropFilter: "blur(10px)",
      transition: "background-color .25s ease, box-shadow .25s ease",
      borderBottom: trigger ? "1px solid rgba(0,0,0,0.08)" : "none",
    },
  });
}

export default function Navigation() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => setOpen(false), [location.pathname, location.hash]);

  return (
    <>
      <ElevationWrapper>
        <AppBar color="transparent" position="fixed">
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ minHeight: { xs: 72, md: 80 } }}>
              {/* Logo */}
              <Box
                component={RouterLink}
                to="/"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <Box
                  component="img"
                  src={VSFoundationLogo}
                  alt="VS Foundation"
                  sx={{ height: { xs: 36, md: 45 }, width: "auto" }}
                />
              </Box>

              <Box sx={{ flexGrow: 1 }} />

              {/* Desktop links */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 3,
                  alignItems: "center",
                  mr: 3,
                }}
              >
                {sections.map((s) => (
                  <Button
                    key={s.label}
                    href={s.href}
                    sx={{
                      textTransform: "none",
                      fontSize: "1.5rem",
                      fontWeight: 500,
                      color: "text.primary",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {s.label}
                  </Button>
                ))}
              </Box>

              {/* Desktop auth buttons */}
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.5 }}>
                <Button
                  component={RouterLink}
                  to="/signin"
                  variant="outlined"
                  size="medium"
                  sx={{
                    textTransform: "none",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    borderRadius: 9999,
                    px: 2.5,
                  }}
                >
                  Log In
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="contained"
                  size="medium"
                  sx={{
                    textTransform: "none",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    borderRadius: 9999,
                    px: 2.5,
                  }}
                >
                  Registration
                </Button>
              </Box>

              {/* Mobile menu */}
              <IconButton
                aria-label="open menu"
                onClick={() => setOpen(true)}
                sx={{
                  display: { xs: "inline-flex", md: "none" },
                  ml: 1,
                  color: "text.primary",
                }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationWrapper>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 300 } }}
      >
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <Box
            component="img"
            src={VSFoundationLogo}
            alt="VS Foundation"
            sx={{ height: 30, width: "auto", mr: 1 }}
          />
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {sections.map((s) => (
            <ListItem key={s.label} disablePadding>
              <ListItemButton component="a" href={s.href}>
                <ListItemText
                  primary={s.label}
                  primaryTypographyProps={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ p: 2, display: "grid", gap: 1 }}>
          <Button
            component={RouterLink}
            to="/signin"
            variant="outlined"
            fullWidth
            sx={{
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: 9999,
            }}
          >
            Log In
          </Button>
          <Button
            component={RouterLink}
            to="/signup"
            variant="contained"
            fullWidth
            sx={{
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: 9999,
            }}
          >
            Registration
          </Button>
        </Box>
      </Drawer>

      {/* Spacer under AppBar */}
      <Toolbar sx={{ minHeight: { xs: 72, md: 80 } }} />
    </>
  );
}
