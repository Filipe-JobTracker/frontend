import * as React from 'react';
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from 'react-router-dom';
import Button from '@mui/material/Button';
import {SxProps} from "@mui/material";
import Box from "@mui/material/Box";
// or

export interface ButtonRouterProps {
    url: string;
    text: string;
    component?: Element;
    sx?: SxProps;
    color?: string;
    icon?: any;
}

const LinkBehavior = (url: string) => {
    return React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(
        (props, ref) => <RouterLink ref={ref} to={url} {...props}/>,
    );
}


export default function RouterButton({
                                         url,
                                         text,
                                         sx,
                                         color,
                                         icon
                                     }: ButtonRouterProps) {
    const behaviour = LinkBehavior(url);
    return (
        <div>
            <Button variant="text" color={color || "primary"}
                    component={behaviour} sx={sx}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: 1,
                }}>
                    <>
                        {icon && <Box sx={{display: 'flex', alignItems: 'center'}}>
                            {icon}
                        </Box>}
                    </>
                    {text}
                </Box>
            </Button>
        </div>
    );
}
