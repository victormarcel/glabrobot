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
    "reviewerIds": [999]
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
- `-t`: Specifies the title of the issue.
- `-d`: Specifies the description of the issue.
- `-e`: Specifies the epic ID associated with the issue.
- `-w`: Specifies the weight of the issue.
- `-l`: Add label by name. Multiple labels should be comma-separated.
- `-m`: Specifies the milestone ID.

#### Merge Request Parameters
Use these parameters when working with merge requests:
- `-t`: Specifies the title of the merge request.
- `--target-branch`: Specifies the target branch where the changes will be merged.
- `--issue-title`: Specifies the title of the related issue for the merge request.
- `--issue-description`: Specifies the description of the related issue for the merge request.
- `-r`: Specifies the ID of the related issue associated with the merge request.
- `-c`: Specifies the ID of the issue to be closed.
- `-l`: Add label by name. Multiple labels should be comma-separated.
- `-m`: Specifies the milestone ID.

### Example Usage

#### Creating an Issue
```bash
glabrobot issue create \
  -t [ISSUE_TITLE] \
  -d [ISSUE_DESCRIPTION] \
  -e [EPIC_ID] \
  -m [MILESTONE_ID] \
  -w [WEIGHT] \
  -l [LABEL, ...]
```

#### Creating a Merge Request
```bash
glabrobot mr create \
  --target-branch "[TARGET_BRANCH]" \
  --issue-title "[ISSUE_TITLE]" \
  --issue-description "[ISSUE_DESCRIPTION]" \
  -m [MILESTONE_ID] \
  -l "LABEL,..."
```

For further details, refer to the source code and comments within the project.