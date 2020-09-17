import React, {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {IAppState, loadItemTrigger} from "../../store/types";
import {Box, Container, Grid, Paper} from "@material-ui/core";
import {Chart} from "../../components/Chart";
import Copyright from "../../components/Copyright";
import LoadingWrapper from "../../components/LoadingWrapper";
import {CurrencyInfo} from "../../components/CurrencyInfo";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 640,
    },
}));

export const DetailsPage: FC = () => {
    const {name} = useParams<{ name: string }>();
    const dispatch = useDispatch();
    const data = useSelector((state: IAppState) => state.selectedItem);

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        const load = () => dispatch({type: loadItemTrigger, payload: name});
        load();
        const timer = setInterval(() => load(), 30000);
        return () => clearInterval(timer);
    }, [name, dispatch]);

    return (
            <main className={classes.content}>
                <Container maxWidth="xl" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <LoadingWrapper isLoading={data.isLoading}>
                                    <Chart {...data}/>
                                </LoadingWrapper>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <LoadingWrapper isLoading={data.isLoading}>
                                    <CurrencyInfo {...data} />
                                </LoadingWrapper>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
            </main>
    );
}
