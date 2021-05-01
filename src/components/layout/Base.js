import Header from "./Header";
import Menu from "./Menu";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Base = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Menu />
      {/*로그인상태에 따라 뜨는 거 다르게 해주세욤!!!!!ㅎㅎ.. */}
      <main className={classes.content}>
        <Toolbar />
        <div>{children}</div>
      </main>
    </div>
  );
};
//스토어랑 연결해서 연결돼있으면 메뉴 보이도록!!!!!!하세욤 여기서 처리할 수 있쨔나?
export default Base;
