//codeमित्र

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

import DashboardLayout from "@/app/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/app/examples/Navbars/DashboardNavbar";
import Footer from "@/app/examples/Footer";
import ProfileInfoCard from "@/app/examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "@/app/examples/Lists/ProfilesList";
import DefaultProjectCard from "@/app/examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "./components/Header";
import PlatformSettings from "./components/PlatformSettings";

// Data (make sure this file exports [] or a safe array without image imports)
import profilesListData from "./data/profilesListData";

// 🔒 Use safe placeholders instead of importing missing assets
const placeholderProject = (id) => `https://picsum.photos/seed/vsproj${id}/600/400`;
const placeholderAvatar = (id) => `https://i.pravatar.cc/80?img=${id}`;

function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />

      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>

            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no..."
                info={{
                  fullName: "Alec M. Thompson",
                  mobile: "(44) 123 1234 123",
                  email: "alecthompson@mail.com",
                  location: "USA",
                }}
                social={[
                  {
                    link: "https://www.facebook.com/codeमित्र/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/codeमित्र",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/codeमित्र",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>

            <Grid item xs={12} xl={4}>
              {/* Ensure profilesListData is safe (no missing image imports).
                  If unsure, temporarily do: profiles={[]} */}
              <ProfilesList title="conversations" profiles={profilesListData || []} shadow={false} />
            </Grid>
          </Grid>
        </MDBox>

        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Projects
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Architects design houses
            </MDTypography>
          </MDBox>
        </MDBox>

        <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={placeholderProject(1)}
                label="project #2"
                title="modern"
                description="As Uber works through a huge amount of internal management turmoil."
                action={{ type: "internal", route: "/pages/profile/profile-overview", color: "info", label: "view project" }}
                authors={[
                  { image: placeholderAvatar(11), name: "Elena Morison" },
                  { image: placeholderAvatar(12), name: "Ryan Milly" },
                  { image: placeholderAvatar(13), name: "Nick Daniel" },
                  { image: placeholderAvatar(14), name: "Peterson" },
                ]}
              />
            </Grid>

            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={placeholderProject(2)}
                label="project #1"
                title="scandinavian"
                description="Music is something that everyone has their own specific opinion about."
                action={{ type: "internal", route: "/pages/profile/profile-overview", color: "info", label: "view project" }}
                authors={[
                  { image: placeholderAvatar(15), name: "Nick Daniel" },
                  { image: placeholderAvatar(16), name: "Peterson" },
                  { image: placeholderAvatar(17), name: "Elena Morison" },
                  { image: placeholderAvatar(18), name: "Ryan Milly" },
                ]}
              />
            </Grid>

            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={placeholderProject(3)}
                label="project #3"
                title="minimalist"
                description="Different people have different taste, and various types of music."
                action={{ type: "internal", route: "/pages/profile/profile-overview", color: "info", label: "view project" }}
                authors={[
                  { image: placeholderAvatar(19), name: "Peterson" },
                  { image: placeholderAvatar(20), name: "Nick Daniel" },
                  { image: placeholderAvatar(21), name: "Ryan Milly" },
                  { image: placeholderAvatar(22), name: "Elena Morison" },
                ]}
              />
            </Grid>

            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={placeholderProject(4)}
                label="project #4"
                title="gothic"
                description="Why would anyone pick blue over pink? Pink is obviously a better color."
                action={{ type: "internal", route: "/pages/profile/profile-overview", color: "info", label: "view project" }}
                authors={[
                  { image: placeholderAvatar(23), name: "Peterson" },
                  { image: placeholderAvatar(24), name: "Nick Daniel" },
                  { image: placeholderAvatar(25), name: "Ryan Milly" },
                  { image: placeholderAvatar(26), name: "Elena Morison" },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
