---
id: AG-01
slug: hr-agent
title: HR Agent
version: v1.0.0
status: live
category: agents
tags: [Microsoft Teams, RAG, SharePoint]
launchUrl: https://teams.microsoft.com/l/chat/19:d0aacc4e-193f-4968-90f3-7f5063291b6b_0f49fb86-706a-46f9-90ae-ad2b9e4818c9@unq.gbl.spaces/conversations?context=%7B%22contextType%22%3A%22chat%22%7D
screenshot: /screenshots/hr-agent.png
timeSaved: "~10 HR tickets per week"
runsToDate: 487
lastUpdated: "2026-03-20"
excerpt: "A Teams-native agent that answers HR questions directly from Brand33's official documents. No tickets, no waiting, no guessing which handbook is current."
---

## The problem

The Brand33 HR team was fielding the same handful of questions on repeat — PTO policy, payroll timing, benefits details, new-hire onboarding steps. Answers lived across a dozen SharePoint documents, and people were either waiting for HR to reply or guessing from an outdated handbook.

## The solution

A Teams-native agent that reads official Brand33 HR documents and answers in natural language, 24/7. Employees chat it the same way they would message a colleague — no new tool to learn, no portal to log into.

## How it works

- Policies, benefits, PTO, payroll, and onboarding questions
- Cites the source document on every answer
- Escalates anything outside its knowledge to a real HR contact
- Lives in Teams — zero onboarding friction for employees

## Stack

- **Microsoft Teams** — delivery channel
- **Retrieval-augmented generation** over curated SharePoint HR docs
- **Access controls** so only Brand33 employees can reach it

## Status

Live and in daily use across the company. Next up: expanding the knowledge base to IT, finance, and ops policies, and adding feedback capture so the agent improves as people use it.
