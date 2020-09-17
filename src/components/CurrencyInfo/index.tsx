import React, {FC} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from "../Title";
import {IAppState} from "../../store/types";

const useStyles = makeStyles({
    type: {
        flex: 1,
    },
});

export const CurrencyInfo: FC<IAppState['selectedItem']> = (
    {
        get: {
            name, volume_24h, price, market_dominance, tweets, news, alt_rank
        }
    }) => {
    const classes = useStyles();
    return (
        <>
            <Title>{`${name} Stats`}</Title>
            <Typography variant="h4">
                {`$${price?.toFixed(2)}`}
            </Typography>
            <Typography color="textSecondary" className={classes.type}>
                {`${name} price`}
            </Typography>
            <Typography variant="h4">
                {`$${volume_24h?.toFixed(2)}`}
            </Typography>
            <Typography color="textSecondary" className={classes.type}>
                {`${name} volume (24h)`}
            </Typography>
            <Typography variant="h4">
                {`${market_dominance?.toFixed(2)}%`}
            </Typography>
            <Typography color="textSecondary" className={classes.type}>
                {`${name} market dominance`}
            </Typography>
            <Typography variant="h4">
                {`Rank ${alt_rank}`}
            </Typography>
            <Typography color="textSecondary" className={classes.type} />
            <Typography variant="h4">
                {`${news} news`}
            </Typography>
            <Typography color="textSecondary" className={classes.type} />
            <Typography variant="h4">
                {`${tweets} tweets`}
            </Typography>
            <Typography color="textSecondary" className={classes.type} />
        </>
    );
}
