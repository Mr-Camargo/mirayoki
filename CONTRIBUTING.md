# Contributing to Mirayoki

First of all, if you are reading this and you are interested in proposing a change in Mirayoki's code, thank you for taking the time to make Mirayoki better! 🎉

Below there are some things you should have in mind before making your first pull request/issue:

## Wait, I just have a question!

For any questions or doubts you have, feel free to [join our Discord Server](https://discord.gg/sbxGVCxdTQ).

## **Important**

If you found a security vulnerability and want to help fix it, **DO NOT** open any pull requests or issues, but check out [how can you report a security vulnerability](SECURITY.md).

---

## How to contribute

Mirayoki is 100% open source, which means everyone can see how it works, and contribute to it.

Anything, from fixing typos to creating new functions, are ways to contribute.

To start, please [fork Mirayoki's repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo) and do as many fixes/improvements as your heart desires.

Following contributions may be accepted:

- Grammatical errors or typos inside the code or to content displayed to the end-user
- More precise translations for supported languages
- Fixes that may make code stronger and more reliable
- New functions/commands that are useful to the end-user or to the developers
- Improvements on existing code

Any other kind of contributions may be discussed with project maintainers, which have the final say.

### Making a pull request

Once you are done fixing/improving your fork, the next step is to [open a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

On your pull request be sure to include:

- Why are you making the change
  - If there is an existing issue that mentions the change you are making, link it.
- What are you changing
  - Give a brief explanation of how the changes you made work.
- Extra information
  - Other information that may help us understand your changes better.


### Requirements

In order for your Pull Request to pass all checks successfully, the following requirements must be met:

- Make sure **your code works correctly.**
  - Honestly, the most complicated part when contributing is making sure all the code you have modified works correctly. To make the reviewer's work easier and your contribution smoother, please test all your code before opening a PR.
- Make sure to **use the correct code style.**
  - Your PR will **not** pass if the styling is not correct. Mirayoki uses [ESlint](https://eslint.org/) to enforce the appropriate styling and syntax revision.
  - If you run `npm run lint` and find more than one error regarding invalid style or syntax you can fix it easily with `npm run lintFix`.
  - If you use [Visual Studio Code](https://code.visualstudio.com/) the [ESlint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) is highly recommended.
- Secure your code.
  - Before going into production, Mirayoki's code is scanned by [CodeQL](https://codeql.github.com/) to find security vulnerabilities. If your code is found to contain a vulnerability, you will be asked to patch it.

Once you have submitted your PR, we will reply to you in less than 48 hours.

---

## Other ways to contribute

If you don't want to open a Pull Request, you can contribute by opening an issue too!

An issue is not only used by problems but can also be used for feature requests and ideas!

Creating one lets us see your idea/problem and let us fix it, so you do not have to write a single line of code.

To start, [create a new issue](https://github.com/Slashy-Studio/mirayoki/issues/new/choose), and follow the instructions to use an issue template.