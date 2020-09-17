import React from 'react';
import {AppBar, createStyles, IconButton, Theme, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export const Header: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const onClick = () => history.push('/');
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton onClick={onClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    CryptoCoin
                </Typography>
            </Toolbar>
        </AppBar>
    )
};
