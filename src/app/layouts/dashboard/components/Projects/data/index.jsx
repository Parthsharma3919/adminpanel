/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
//codeमित्र

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "@/app/components/MDBox";
import MDTypography from "@/app/components/MDTypography";
import MDAvatar from "@/app/components/MDAvatar";
import MDProgress from "@/app/components/MDProgress";

// 🔒 Use safe online placeholder images (instead of missing local assets)
const logoPlaceholder = (name) =>
  `https://via.placeholder.com/40x40.png?text=${encodeURIComponent(name[0].toUpperCase())}`;
const avatarPlaceholder = (id) => `https://i.pravatar.cc/80?img=${id}`;

export default function data() {
  const avatars = (members) =>
    members.map(([image, name], idx) => (
      <Tooltip key={idx} title={name} placement="bottom">
        <MDAvatar
          src={image}
          alt={name}
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",
            "&:not(:first-of-type)": { ml: -1.25 },
            "&:hover, &:focus": { zIndex: "10" },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "companies", accessor: "companies", width: "45%", align: "left" },
      { Header: "members", accessor: "members", width: "10%", align: "left" },
      { Header: "budget", accessor: "budget", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
    ],

    rows: [
      {
        companies: <Company image={logoPlaceholder("XD")} name="Material UI XD Version" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [avatarPlaceholder(1), "Ryan Tompson"],
              [avatarPlaceholder(2), "Romina Hadid"],
              [avatarPlaceholder(3), "Alexander Smith"],
              [avatarPlaceholder(4), "Jessica Doe"],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $14,000
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={60} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company image={logoPlaceholder("A")} name="Add Progress Track" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [avatarPlaceholder(5), "Romina Hadid"],
              [avatarPlaceholder(6), "Jessica Doe"],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $3,000
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={10} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company image={logoPlaceholder("S")} name="Fix Platform Errors" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [avatarPlaceholder(7), "Ryan Tompson"],
              [avatarPlaceholder(8), "Alexander Smith"],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Not set
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={100} color="success" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company image={logoPlaceholder("SP")} name="Launch our Mobile App" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [avatarPlaceholder(9), "Jessica Doe"],
              [avatarPlaceholder(10), "Alexander Smith"],
              [avatarPlaceholder(11), "Romina Hadid"],
              [avatarPlaceholder(12), "Ryan Tompson"],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $20,500
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={100} color="success" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company image={logoPlaceholder("J")} name="Add the New Pricing Page" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([[avatarPlaceholder(13), "Jessica Doe"]])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $500
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={25} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
      {
        companies: <Company image={logoPlaceholder("I")} name="Redesign New Online Shop" />,
        members: (
          <MDBox display="flex" py={1}>
            {avatars([
              [avatarPlaceholder(14), "Ryan Tompson"],
              [avatarPlaceholder(15), "Jessica Doe"],
            ])}
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            $2,000
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={40} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      },
    ],
  };
}
