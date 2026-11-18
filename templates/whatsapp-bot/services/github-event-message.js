function getCommonPullRequestData(body) {
  return {
    prTitle: body.pull_request?.title,
    prLink: body.pull_request?.html_url,
    repo: body.repository?.name,
    author: body.pull_request?.user?.login,
    branch: body.pull_request?.head?.ref,
  };
}

function formatBlock(lines) {
  return lines.filter(Boolean).join("\n");
}

function formatPullRequestDetails({
  author,
  repo,
  prTitle,
  prLink,
  branch,
}) {
  return formatBlock([
    `🧑 Author: ${author}`,
    `📦 Repo: ${repo}`,
    branch ? `🌿 Branch: ${branch}` : null,
    `📌 ${prTitle}`,
    `🔗 ${prLink}`,
  ]);
}

function buildPullRequestEventMessage(body) {
  const action = body.action;

  const {
    prTitle,
    prLink,
    repo,
    author,
    branch,
  } = getCommonPullRequestData(body);

  if (action === "assigned") {
    const user = body.assignee?.login;

    return {
      user,
      messageText: formatBlock([
        "📌 PR Assigned",
        "",
        `👤 Assigned To: ${user}`,
        formatPullRequestDetails({
          author,
          repo,
          prTitle,
          prLink,
          branch,
        }),
      ]),
    };
  }

  if (action === "review_requested") {
    const user = body.requested_reviewer?.login;

    return {
      user,
      messageText: formatBlock([
        "👀 PR Review Requested",
        "",
        `👤 Reviewer: ${user}`,
        formatPullRequestDetails({
          author,
          repo,
          prTitle,
          prLink,
          branch,
        }),
      ]),
    };
  }

  if (action === "closed" && body.pull_request?.merged) {
    return {
      user: author,
      messageText: formatBlock([
        "✅ PR Merged",
        "",
        formatPullRequestDetails({
          author,
          repo,
          prTitle,
          prLink,
          branch,
        }),
      ]),
    };
  }

  return null;
}

function buildPullRequestReviewEventMessage(body) {
  const state = body.review?.state;

  const {
    prTitle,
    prLink,
    repo,
    author,
  } = getCommonPullRequestData(body);

  const reviewer = body.review?.user?.login;

  if (state === "approved") {
    return {
      user: author,
      messageText: formatBlock([
        "✅ PR Approved",
        "",
        `👤 Approved By: ${reviewer}`,
        formatPullRequestDetails({
          author,
          repo,
          prTitle,
          prLink,
        }),
      ]),
    };
  }

  if (state === "changes_requested") {
    return {
      user: author,
      messageText: formatBlock([
        "📣 Changes Requested",
        "",
        `👤 Reviewer: ${reviewer}`,
        formatPullRequestDetails({
          author,
          repo,
          prTitle,
          prLink,
        }),
      ]),
    };
  }

  return null;
}

function buildIssueEventMessage(body) {
  if (body.action !== "assigned") {
    return null;
  }

  const user = body.assignee?.login;

  return {
    user,
    messageText: formatBlock([
      "📋 Issue Assigned",
      "",
      `👤 Assigned To: ${user}`,
      `🧑 Created By: ${body.issue?.user?.login}`,
      `📦 Repo: ${body.repository?.name}`,
      `📌 ${body.issue?.title}`,
      `🔗 ${body.issue?.html_url}`,
    ]),
  };
}

function buildWorkflowRunEventMessage(body) {
  if (body.workflow_run?.conclusion !== "failure") {
    return null;
  }

  const user = body.workflow_run?.actor?.login;
  const workflow = body.workflow_run?.name;
  const link = body.workflow_run?.html_url;

  return {
    user,
    messageText: formatBlock([
      "❌ CI Failed",
      "",
      `👤 Triggered By: ${user}`,
      `⚙️ Workflow: ${workflow}`,
      `🔗 ${link}`,
    ]),
  };
}

export function buildGithubEventMessage(event, body) {
  switch (event) {
    case "pull_request":
      return buildPullRequestEventMessage(body);

    case "pull_request_review":
      return buildPullRequestReviewEventMessage(body);

    case "issues":
      return buildIssueEventMessage(body);

    case "workflow_run":
      return buildWorkflowRunEventMessage(body);

    default:
      return null;
  }
}

export {
  buildPullRequestEventMessage,
  buildPullRequestReviewEventMessage,
  buildIssueEventMessage,
  buildWorkflowRunEventMessage,
};