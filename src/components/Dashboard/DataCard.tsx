import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface DataCardProps {
    title: string;
    value: number;
}

export default function DataCard({title, value}: DataCardProps) {
    return (<Card sx={{maxWidth: 200}}>
            <CardContent>
                <Typography gutterBottom sx={{
                    color: 'text.secondary',
                    fontSize: 14,
                    textAlign: 'center',
                    lineHeight: 2.5,
                }}>
                    {title}
                </Typography>
                <Typography variant="body1" sx={{
                    textAlign: 'center',
                    fontSize: 24,
                    lineHeight: 1.125,
                    mb: 2
                }}>
                    {value}
                </Typography>
            </CardContent>
        </Card>);
}
