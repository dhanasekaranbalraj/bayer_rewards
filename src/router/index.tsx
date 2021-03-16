import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Components = lazy(() => import("../boostrap"));

function Router() {
  return (
    // <BrowserRouter>
      <Suspense fallback={ <p>..</p>}>
        <Switch>
          <Route path="/" render={() => <Components />} />
        </Switch>
      </Suspense>
    // </BrowserRouter>
  );
}

export { Router };
