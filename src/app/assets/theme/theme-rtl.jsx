// @mui material components
import { createTheme } from "@mui/material/styles";
// import Fade from "@mui/material/Fade";

import colors from "./base/colors.jsx";
import breakpoints from "./base/breakpoints.jsx";
import typography from "./base/typography.jsx";
import boxShadows from "./base/boxShadows.jsx";
import borders from "./base/borders.jsx";
import globals from "./base/globals.jsx";

import boxShadow from "./functions/boxShadow.jsx";
import hexToRgb from "./functions/hexToRgb.jsx";
import linearGradient from "./functions/linearGradient.jsx";
import pxToRem from "./functions/pxToRem.jsx";
import rgba from "./functions/rgba.jsx";

import sidenav from "./components/sidenav.jsx";
import list from "./components/list/index.jsx";
import listItem from "./components/list/listItem.jsx";
import listItemText from "./components/list/listItemText.jsx";
import card from "./components/card/index.jsx";
import cardMedia from "./components/card/cardMedia.jsx";
import cardContent from "./components/card/cardContent.jsx";
import button from "./components/button/index.jsx";
import iconButton from "./components/iconButton.jsx";
import input from "./components/form/input.jsx";
import inputLabel from "./components/form/inputLabel.jsx";
import inputOutlined from "./components/form/inputOutlined.jsx";
import textField from "./components/form/textField.jsx";
import menu from "./components/menu/index.jsx";
import menuItem from "./components/menu/menuItem.jsx";
import switchButton from "./components/form/switchButton.jsx";
import divider from "./components/divider.jsx";
import tableContainer from "./components/table/tableContainer.jsx";
import tableHead from "./components/table/tableHead.jsx";
import tableCell from "./components/table/tableCell.jsx";
import linearProgress from "./components/linearProgress.jsx";
import breadcrumbs from "./components/breadcrumbs.jsx";
import slider from "./components/slider.jsx";
import avatar from "./components/avatar.jsx";
import tooltip from "./components/tooltip.jsx";
import appBar from "./components/appBar.jsx";
import tabs from "./components/tabs/index.jsx";
import tab from "./components/tabs/tab.jsx";
import stepper from "./components/stepper/index.jsx";
import step from "./components/stepper/step.jsx";
import stepConnector from "./components/stepper/stepConnector.jsx";
import stepLabel from "./components/stepper/stepLabel.jsx";
import stepIcon from "./components/stepper/stepIcon.jsx";
import select from "./components/form/select.jsx";
import formControlLabel from "./components/form/formControlLabel.jsx";
import formLabel from "./components/form/formLabel.jsx";
import checkbox from "./components/form/checkbox.jsx";
import radio from "./components/form/radio.jsx";
import autocomplete from "./components/form/autocomplete.jsx";
import container from "./components/container.jsx";
import popover from "./components/popover.jsx";
import buttonBase from "./components/buttonBase.jsx";
import icon from "./components/icon.jsx";
import svgIcon from "./components/svgIcon.jsx";
import link from "./components/link.jsx";
import dialog from "./components/dialog/index.jsx";
import dialogTitle from "./components/dialog/dialogTitle.jsx";
import dialogContent from "./components/dialog/dialogContent.jsx";
import dialogContentText from "./components/dialog/dialogContentText.jsx";
import dialogActions from "./components/dialog/dialogActions.jsx";

export default createTheme({
  direction: "rtl",
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
