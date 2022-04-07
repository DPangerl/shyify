import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Card,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
} from "@mui/material/modern";

import { hyphenateHTML } from "hyphen/de";

const FlexBox = (props) => <Box sx={{ display: "flex", width: "100%" }} {...props} />;
const CardBox = (props) => <Card sx={{ flex: "1 1 100%", padding: "1rem", margin: "1rem" }} {...props} />;

type AlertObject = {
  message: string;
  severity?: string;
};

const DEFAULT_TEXT =
  "Die Meteorologen warnten vor Sturmböen im Flachland und Orkanböen im Bergland. In Oberfranken rechnete der DWD ab 600 Meter Höhe mit Orkanböen von bis zu 115 Stundenkilometern. Im südlichen Bayern sollten die Böen oberhalb von 1500 Metern sogar 130 Stundenkilometer schnell sein.";

export default function Start() {
  const [alert, setAlert] = useState<AlertObject | null>(null);
  const [hyphenChar, setHyphenChar] = useState("&shy;");
  const [language, setLanguage] = useState("en");
  const [minWordLength, setMinWordLength] = useState(5);
  const [text, setText] = useState(DEFAULT_TEXT);
  const [hyphenatedText, setHyphenatedText] = useState("");

  function handleCloseAlert() {
    setAlert(null);
  }
  function handleChangeText(e) {
    setText(e.target.value);
  }
  function handleChangeLanguage(e) {
    setLanguage(e.target.value);
  }
  function handleChangeCharacter(e) {
    setHyphenChar(e.target.value);
  }
  function handleChangeMinWordLength(e) {
    setMinWordLength(e.target.value);
  }
  function handleClickCopyToClipboard() {
    navigator.clipboard.writeText(hyphenatedText);
  }

  useEffect(() => {
    hyphenateHTML(text, { hyphenChar, minWordLength })
      .then((result) => setHyphenatedText(result))
      .catch((err) => console.error(err));
  });

  return (
    <Box m={2}>
      <Box m={4} maxWidth="75vw">
        <Typography variant="h1">Shyify</Typography>
        <Typography variant="body1">
          Easily hyphenate all your plain texts or HTML with{" "}
          <Typography component="span" color="primary">
            <a href="https://github.com/ytiurin/hyphen">
              ytiurin’s cool npm package <strong>hyphen</strong>.
            </a>
          </Typography>
          <br />
          Use <strong>&amp;shy;</strong> or <strong>Hyphens</strong> or any <strong>other substitution</strong> you wish
          to break up your text. Wanna use your favorite emoji: Do it!
        </Typography>
      </Box>
      <FlexBox>
        <CardBox>
          <Box mb={1}>
            <Typography variant="h4">
              Input{" "}
              <Typography variant="body1" component="span">
                (plain text or HTML)
              </Typography>
            </Typography>
          </Box>
          <TextField fullWidth multiline rows={8} value={text} onChange={handleChangeText} />
          <FlexBox mt={2} alignItems="center" height="4rem">
            <Box flex="1 1 100%" display="flex">
              <FormControl fullWidth>
                <InputLabel id="langSelect">Language</InputLabel>
                <Select label="Language" labelId="langSelect" value={language} onChange={handleChangeLanguage}>
                  <MenuItem value="en">Englisch</MenuItem>
                  <MenuItem value="de">Deutsch (German)</MenuItem>
                </Select>
              </FormControl>
              <Box px={1} />
              <TextField
                label="Replace with character"
                InputLabelProps={{ shrink: true }}
                value={hyphenChar}
                onChange={handleChangeCharacter}
              />
              <Box px={1} />
              <TextField
                type="number"
                label="Min Word Length"
                InputLabelProps={{ shrink: true }}
                value={minWordLength}
                onChange={handleChangeMinWordLength}
              />
              <Box px={1} />
            </Box>
          </FlexBox>
        </CardBox>
        <CardBox>
          <Box mb={1}>
            <Typography variant="h4">Edit</Typography>
          </Box>
          <TextField fullWidth multiline rows={8} value={hyphenatedText} />
          <FlexBox mt={2} alignItems="center" height="4rem">
            <Button variant="contained" onClick={handleClickCopyToClipboard}>
              Copy to Clipboard
            </Button>
          </FlexBox>
        </CardBox>
      </FlexBox>
      <Snackbar open={Boolean(alert)} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert?.severity || "info"} sx={{ width: "100%" }}>
          {alert?.message}
        </Alert>
      </Snackbar>
      <Box textAlign="center" mt={2}>
        –––
        <Typography>
          Reliably hosted by Vercel | Brought to you by{" "}
          <Typography component="span" color="primary">
            <a href="https://github.com/DPangerl">dpangerl</a>
          </Typography>
        </Typography>
        –––
      </Box>
    </Box>
  );
}
