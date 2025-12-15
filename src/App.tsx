import { Container, Step, StepLabel, Stepper, Typography } from "@mui/material";
import "./App.css";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";
import Result from "./components/Result";
import History from "./components/History";
import { useWizardStore } from "./store/wizard-store";

function App() {
  const steps = ["Preferences", "Ingredients", "Result"];
  const { activeStep } = useWizardStore();
  return (
    <>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Recipe Finder
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Find your next meal idea in 2 steps
        </Typography>

        <Stepper activeStep={activeStep} sx={{ my: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && <FirstStep />}
        {activeStep === 1 && <SecondStep />}
        {activeStep === 2 && <Result />}
        <History />
      </Container>
    </>
  );
}

export default App;
