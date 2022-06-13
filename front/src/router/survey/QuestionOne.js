import { Typography, ToggleButtonGroup, ToggleButton } from "@mui/material/";

export default function QuestionOne(props) {
  const wine = props.wine;
  const handleChange = (event) => {
    props.setWine(event.target.value);
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        마시고 싶은 와인의 종류를 골라주십시오.
      </Typography>
      <ToggleButtonGroup size="large" orientation="vertical" value={wine} exclusive onChange={handleChange} fullWidth sx={{ mb: 3 }}>
        <ToggleButton value="RED" aria-label="red">
          레드와인
        </ToggleButton>
        <ToggleButton value="WHITE" aria-label="white">
          화이트와인
        </ToggleButton>
        <ToggleButton value="ROSE" aria-label="rose">
          로제와인
        </ToggleButton>
        <ToggleButton value="SPARKLING" aria-label="sparkling">
          스파클링와인
        </ToggleButton>
        <ToggleButton value="DESSERT" aria-label="dessert">
          디저트와인
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
