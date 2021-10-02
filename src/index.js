import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline, Container, Card, Stack, Button, Grid, AppBar, Toolbar, Typography, ToggleButton, ToggleButtonGroup, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
            <ToggleButton color="primary" value="h">English</ToggleButton>
            <ToggleButton color="primary" value="ch-t">大本(繁)</ToggleButton>
            <ToggleButton color="primary" value="ts-t">補充本(繁)</ToggleButton>
            <ToggleButton color="primary" value="ch-s">大本(简)</ToggleButton>
            <ToggleButton color="primary" value="ts-s">补充本(简)</ToggleButton>
            <ToggleButton color="primary" value="ns">New Songs</ToggleButton>
            <ToggleButton color="primary" value="c">Children</ToggleButton>
        </ToggleButtonGroup>
    )
}

function TopAppBar() {
    return (
        <Card>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" component="div">
                        Hymnal (by number)
                    </Typography>
                </Toolbar>
            </AppBar>
        </Card>
    )
}

function MainContainer() {
    const [language, setLanguage] = React.useState("h");
    const [searchInput, setSearchInput] = React.useState();
    const textField = React.useRef(null);
    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    }
    const handleSearchInput = (event) => {
        setSearchInput(event.target.value);
    }
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) handleClick();
    }
    const getUrl = () => {
        let queryParam = "";
        let searchLang;
        if (language.includes("-")) {
            searchLang = language.split("-")[0];
            let chineseType = language.split("-")[1];
            if (chineseType === "s") queryParam = "?gb=1";
        } else {
            searchLang = language;
        }
        let url = baseUrl + searchLang + "/" + searchInput + queryParam;
        return url;
    }
    const handleClick = () => {
        window.open(getUrl());
        setSearchInput("");
    }
    return (
        <Card>
            <Grid container>
                <Grid item xs={4}>
                    <LanguageToggleButtonGroup onLanguageChange={handleLanguageChange} />
                </Grid>
                <Grid item xs={8}>
                    <Stack spacing={2} sx={{mt: 2}}>
                        <TextField ref={textField} label="Enter hymn number" variant="outlined" type="number" value={searchInput} onChange={handleSearchInput} onKeyDown={handleKeyDown}></TextField>
                        <Button variant="contained" size="large" onClick={handleClick}>Go</Button>
                        <center><small>Powered by <a href="https://www.hymnal.net/" target="_blank" rel="noreferrer">https://www.hymnal.net/</a></small></center>
                    </Stack>
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
                    <Container maxWidth="md" sx={{p:0}}>
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