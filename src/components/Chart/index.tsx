import React, {FC} from "react";
import {useTheme} from '@material-ui/core/styles';
import Title from "../../components/Title";
import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {IAppState} from "../../store/types";

export const Chart: FC<IAppState['selectedItem']> = ({get: {sparkline, name}}) => {
    const theme = useTheme();

    return (
        <>
            <Title>{`${name} Charts`}</Title>
            <ResponsiveContainer>
                <LineChart
                    data={sparkline}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary}/>
                    <YAxis stroke={theme.palette.text.secondary}>
                    </YAxis>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="market_cap" stroke="#8884d8"/>
                    <Line type="monotone" dataKey="market_cap_global" stroke="#82ca9d" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}
