# glabrobot

## Project Setup

Follow these steps to set up the project:

### 1. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/victormarcel/glabrobot.git
cd glabrobot
```

### 2. Install Node.js and npm
Install Node.js and npm using [Homebrew](https://brew.sh/):
```bash
brew install node
```

### 3. Install Dependencies
Install the required npm dependencies:
```bash
npm install
```

### 4. Configure the Project
Create a `config.json` file in the root directory of the project. Use the following template:
```json
{
    "projectId": 999,
    "assigneeId": 999,
    "reviewer_ids": [999],
    "milestoneId": 999
}
```

### 5. Create an Alias
Add the following alias to your `.zshrc` file to simplify running the project:
```bash
alias glabrobot='node ~/[DEVELOPER_DIRECTORY]/glabrobot'
```

### 6. Run the Project
You can now run the project using the alias:
```bash
glabrobot [ACTION] [PARAMETERS]
```

### 7. Environment Variables
Ensure the following environment variable is set in your `.zshrc` file:
```bash
export GITLAB_PRIVATE_TOKEN="your-private-token"
```
Replace `your-private-token` with your actual GitLab private token.

---

## Available Commands and Parameters

The `glabrobot` CLI supports the following commands and parameters:

### Commands
- **issue**: Create and manage issues.
- **mr**: Create and manage merge requests.

### Parameters

#### Issue Parameters
Use these parameters when working with issues:
- `--title`: The title of the issue.
- `--description`: A description of the issue.
- `--assignee`: The ID of the assignee for the issue.

#### Merge Request Parameters
Use these parameters when working with merge requests:
- `--source-branch`: The source branch for the merge request.
- `--target-branch`: The target branch for the merge request.
- `--reviewer`: The ID of the reviewer for the merge request.

### Example Usage

#### Creating an Issue
```bash
glabrobot issue create --title "Fix Bug" --description "Fixes a critical bug" --assignee 123
```

#### Creating a Merge Request
```bash
glabrobot mr create --source-branch feature/bugfix --target-branch main --reviewer 456
```

For further details, refer to the source code and comments within the project.