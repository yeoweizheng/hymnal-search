import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline, Container, Card, Box, Grid, AppBar, Toolbar, IconButton, Typography, ToggleButton, ToggleButtonGroup, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";

const baseUrl = "https://www.hymnal.net/en/hymn/";

const theme = createTheme({
    palette: {
        primary: {
            main: "#21257f",
        },
        secondary: {
            main: "#f50057",
        },
    }
})

function LanguageToggleButtonGroup({onLanguageChange}){
    const [language, setLanguage] = React.useState("h");
    const handleChange = (event, newLanguage) => {
        setLanguage(newLanguage);
        onLanguageChange(newLanguage);
    }
    return (
        <ToggleButtonGroup 
            orientation="vertical" 
            sx={{width: "100%"}}
            value={language}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton value="h">English</ToggleButton>
            <ToggleButton value="ch">大本</ToggleButton>
            <ToggleButton value="ts">补充本</ToggleButton>
        </ToggleButtonGroup>
    )
}

function HymnSearchBar({onSearchInput}) {
    return(
        <TextField fullWidth label="Search hymn number" variant="outlined" type="number" onChange={onSearchInput}></TextField>
    )
}

function SearchResult({text}) {
    return (
        <h1>{text}</h1>
    )
}

function TopAppBar() {
    return (
        <Card>
            <AppBar position="static">
                <Toolbar sx={{alignItems: "center"}}>
                    <Typography variant="h6" color="inherit" component="div">
                        Hymn Search
                    </Typography>
                </Toolbar>
            </AppBar>
        </Card>
    )
}

function MainContainer() {
    const [language, setLanguage] = React.useState("h");
    const [searchInput, setSearchInput] = React.useState();
    const [text, setText] = React.useState();
    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    }
    const handleSearchInput = (event) => {
        setSearchInput(event.target.value);
    }
    const getUrl = () => {
        return baseUrl + language + "/" + searchInput;
    }
    const performRequest = () => {
        axios.get(getUrl(), {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => {
            setText(response.data);
        });
    }
    React.useEffect(() => {
        performRequest();
    })
    return (
        <Card>
            <Grid container>
                <Grid item lg={2}>
                    <LanguageToggleButtonGroup onLanguageChange={handleLanguageChange} />
                </Grid>
                <Grid item lg={10}>
                    <HymnSearchBar onSearchInput={handleSearchInput} />
                    <SearchResult text={text}/>
                </Grid>
            </Grid>
        </Card>
    )
}

class MainApp extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <ThemeProvider theme={theme}>
                    <Container maxWidth="lg">
                        <TopAppBar />
                        <MainContainer />
                    </Container>
                    </ThemeProvider>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <MainApp />,
    document.getElementById("root")
);