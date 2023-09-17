# Software Engineering - SSPO

## Developer's guide

* Package manager: `yarn`
  Run scripts and install using `yarn` instead of `npm`.

* `yarn dev` should suffice in most cases. It automatically rebuild backend & frontend on change and restarting the server. However, one must refresh the page to see the change.

* Before commit:
  * Run `yarn lint:fix` to automatically fix auto-fixable linting errors.
  * Run `yarn lint` to check and fix non-auto-fixable linting errors.
