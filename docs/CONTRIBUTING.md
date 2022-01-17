# How to Contribute
We love your pull requests! :tada:

## Code of Conduct
Please note, like all software developed by The Huddle, all contributions are expected to follow our [Code of Conduct](https://codehuddle.org/code-of-conduct).

## Contribution Process
Features, bug fixes, and ticketing are all community-driven.
Here is how to get started.

## Issues
Raising an issue helps keep track of bugs, new features, and progress.
Anyone can raise an issue, but please follow these 2 big guidelines when submitting issues.

### 1. Make sure your issue hasn't already been raised
We won't ban you forever because you raised a duplicate issue, but we will certainly grumble your name if you make a habit of it ;)

Please search the open issues to make sure your issue has not already been raised.
If you find your issue has already been raised, consider upvoting the issue to increase awareness and priority of an issue.

New features and bug fixes are prioritized, approved, and denied by our core contributors.
Avoid spamming issues which have been de-prioritized or previously denied.

### 2. Submit sufficient relevant information
The more information the better!
Relevant screen-shots, console/network logs, and error messages are a great place to start when describing a new feature or identifying a bug.

Including a concise description, and all the relevant information helps streamline the issue!


## Pull Requests
Pull requests drive the website.
If you want to contribute, but are not sure how, look for an open issue or ask the discord for guidance!

### Making a pull request
Making a pull request is easy!

#### 1. Fork the repository
You can only push feature branches to a repository when you have write access.
In order to contribute, make your own fork!
In GitHub, this is done by clicking the "FORK" button on the appropriate repository.

#### 2. Develop and push your changes to a branch within your fork
On your fork, you have full write access.
It is your own workspace, so you can develop as you please!

You are not required to use any particular editor when developing, but if your particular editor introduces new artifacts, please include them in the gitignore.

#### 3. Make a pull request from the appropriate branch on your fork
To make a pull request from your fork, navigate to the branch you want to include and click the "New Pull Request" button
(*note that this button often appears automatically if you have pushed to your fork recently*).

Here you will be able to create a title and description.
If your pull request relates to an issue, please link the issue.
Leave a concise description of the bug-fix or feature your code includes.
Like with issues, include screenshots and additional information where necessary.

#### 4.1 CI - Formatting
Before a pull request can be accepted, your code must pass both a *formatting check* and *automated tests*.
The format check will run before the tests.
This means formatting is required for your code to be accepted!

After running `npm install`, a friendly pre-commit hook will automatically run each time as you commit.
This means you should only experience issues with formatting in the CI if you intentionally bypass this hook.

Please see the [`package.json`](../package.json) for more details on manually invoking the formatter.

#### 4.2 CI - Tests
The automated testing pipeline will run as soon as you make a pull request from your fork.
**If tests fail, your pull request cannot be accepted**.

#### 5. Request review
Reviewers are assigned by community-run triage.
Within a day or two, you can expect a reviewer to be assigned to your pull request.
If a reviewer is not assigned to your pull request within a few days, feel free to reach out to a core team member on the discord!

#### 6. Done!
After your pull request has been reviewed, the core team will merge your pull request.
Changes will deploy through automated CI pipelines monitored by the core member who merges your request and will typically be live about 5-10 minutes after being merged.

### Development troubles
If you are having trouble getting code to work, the community is available to help!
Consider *asking a community member nicely* (through the discord) to help you if you are stuck when developing.
Remember that everyone's time is valuable and that no community member is obligated to help!

Unless you have identified a specific bug, please avoid opening tickets like "my build doesn't work," or "*x* doesn't work on my machine."
The community is happy to help you get started, but these questions are better suited for the discord! :)

### Clean History
During code review, you may be asked to clean up your git history.
If you are unsure how to do this, please see [the git rebase documentation](https://git-scm.com/docs/git-rebase) or ask the community for help.

### Data Access
You have as much data access as you do when you are logged in to the website.
We do not currently have a development server, so remember you are logged in to the production API.
All requests and change history are logged; *you are not anonymous on the API*.

While, generally, you only have read access to data, **you can change your own password and delete files you have uploaded**.
Be very careful if you plan on developing on issues relating to your own data.
