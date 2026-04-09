---
id: A-01
slug: job-kickoff
title: Job Kickoff Workflow
version: v0.9.0
status: live
category: automations
client: Brand33
tags: [n8n, SharePoint, Asana, Ziflow, Function Point]
launchUrl: https://cd333.app.n8n.cloud/form/26f02a42-0b9b-437d-ba94-906bbc5adedc
sopUrl: https://scribehow.com/page-embed/New_Job_Resource_Creation_Workflow__ccn_DR5oRvy5ynn7u_gwuA
screenshot: /screenshots/job-kickoff.png
timeSaved: "~25 min per job"
runsToDate: 142
lastUpdated: "2026-03-15"
excerpt: "Starting a new job used to mean touching five different tools. One form now creates the estimate, folders, proof, and project in about a minute."
---

## The problem

Every new job at Brand33 required the same tedious setup across multiple systems: estimate built in Function Point, folder tree stood up in SharePoint, proof scaffolded in Ziflow, and a project with tasks created in Asana. The work was mechanical, easy to get wrong, and it sat on whoever happened to be available that morning.

## The solution

A single n8n workflow that accepts a job brief PDF plus a handful of dropdown inputs and fans out to every downstream system. Traffic submits the form, the workflow does the rest.

## How it works

- Upload the job brief PDF and pick the client, job type, and due dates from the form
- n8n extracts the brief, builds a Function Point estimate, and opens the job
- SharePoint folder structure is provisioned from a standard template
- Ziflow proof is created and linked back to the job
- Asana project is spun up with the right task template and owners
- All IDs and links are posted back so the team has one place to start

## Stack

- **n8n** — orchestration engine, custom nodes, error branches
- **SharePoint Graph API** — folder provisioning from template
- **Asana API** — project + task template instantiation
- **Ziflow API** — proof creation and routing
- **Function Point API** — estimate and job record creation
- **PDF parsing** — structured field extraction from the brief

## Status

Live in beta with the traffic team. Next up: richer brief parsing, budget validation against estimate templates, and a status dashboard for in-flight runs.
