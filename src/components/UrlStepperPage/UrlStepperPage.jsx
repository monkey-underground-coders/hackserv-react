import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { Redirect, useHistory } from "react-router-dom";
import StepperDoc from "./StepperDoc";
import UrlStepContext from "./UrlStepContext";

const UrlStepperPage = ({ steps, title, lastUrl = null, ...rest }) => {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const stepToUrl = (before, step) => `${before}/step${step + 1}`;

  return (
    <Switch>
      {steps.map(({ label, component: Component }, index) => (
        <Route
          key={index}
          path={stepToUrl(path, index)}
          render={() => {
            const nextStepUrl =
              index !== steps.length - 1 ? stepToUrl(url, index + 1) : lastUrl;

            const handleNext = () => history.push(nextStepUrl);

            const prevStepUrl = index !== 0 && stepToUrl(url, index - 1);

            const handlePrev = () => history.push(prevStepUrl);

            return (
              <UrlStepContext.Provider
                value={{
                  title: label,
                  step: index,
                  steps,
                  nextStepUrl,
                  handleNext,
                  prevStepUrl,
                  handlePrev,
                }}
              >
                <StepperDoc title={title} steps={steps} step={index}>
                  <Component {...rest} />
                </StepperDoc>
              </UrlStepContext.Provider>
            );
          }}
        />
      ))}
      <Redirect from={`${path}/`} to={`${path}/step1`} />
    </Switch>
  );
};

export default UrlStepperPage;
