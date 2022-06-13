import { Typography, ToggleButtonGroup, ToggleButton } from "@mui/material/";

export default function QuestionTwo(props) {
  const price = props.price;
  const handleChange = (event) => {
    props.setPrice(event.target.value);
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        생각하는 가격대가 있으십니까?
      </Typography>
      <ToggleButtonGroup size="large" orientation="vertical" value={price} exclusive onChange={handleChange} fullWidth sx={{ mb: 3 }}>
        <ToggleButton value="1">1만원 내외</ToggleButton>
        <ToggleButton value="2">2~3만원대</ToggleButton>
        <ToggleButton value="3">4~6만원대</ToggleButton>
        <ToggleButton value="4">7~10만원대</ToggleButton>
        <ToggleButton value="0">상관없어요</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
