import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  flexspace: {
    display: "flex",
    justifyContent: "space-between",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.flexspace}>
        <Typography variant="h6" noWrap>
          충북대학교 SW중심대학사업단 Keep-UpⓇ 관리 시스템
        </Typography>
        <div>
          <Button className={classes.menuButton} color="inherit">
            로그인
          </Button>
          <Button className={classes.menuButton} color="inherit">
            회원가입
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
