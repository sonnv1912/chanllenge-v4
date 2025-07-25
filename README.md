# Coding Challenge #4

## My apologize

Currently I don't have condition to have a work email and my budget is not enough to send OTP with SMS so I decide to change to send OTP with Email.

Best regards

Ngo Van Son

## What's inside?

This repo includes the following packages/apps:

## Apps and Packages

- `frontend`: a ui for staff and admin
- `backend`: a server to hold api to connect with `frontend`
- `@packages/configs`: shared configs with `frontend` and `backend`
- `@packages/types`: shared types with `frontend` and `backend`

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Folder structure

````
.
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── configs (contains `backend` configs)
│   │   │   ├── data (contains functions that get collections data to reuse somewhere)
│   │   │   ├── services (contains collection service)
│   │   │   └── utils (contains useful variable, functions that use somewhere)
│   │   └── index.ts (start point)
│   └── frontend/
│       ├── src/
│       │   ├── assets (contains static, media files)
│       │   ├── components (contains reuseable components)
│       │   ├── configs (contains `frontend` configs)
│       │   ├── hooks (contains reuseable hooks)
│       │   ├── layouts (contains app layouts)
│       │   ├── modals (contains modal components)
│       │   ├── navigation (contains app navigation)
│       │   ├── pages (contains app pages)
│       │   ├── services (contains service of each collection)
│       │   └── utils (contains reuse function to use somewhere)
│       └── main.tsx (start point)
├── packages/
│   ├── configs (shared configs of `backend` and `frontend`)
│   └── types (shared types of `backend` and `frontend`)
└── README.md (about my project)
````

## Develop

To develop all apps and packages, follow these steps:

- Download service-account.json through [url (only for hongnguyen.skipli.engineering@gmail.com and engineering@skiplinow.com)](https://drive.google.com/drive/folders/1_fkpq4s-t_IMplkIeV61hTxtBwUUaF25?usp=drive_link) and place it in this [folder](apps/backend/src/configs)

- Then run following command
```
yarn install && yarn dev
```

## Fun fact

- [react-motion-modal made by me](https://github.com/sonnv1912/react-motion-modal)

## Snapshot

- Fully responsive on each page
- Backend run on [localhost:4000](http://localhost:4000)
- Frontend run on [localhost:4444](http://localhost:4444)

| Page         | Screenshot |
|--------------|------------|
| Welcome      | ![](https://github.com/user-attachments/assets/7bb7c5ff-444c-4960-b35a-e30878a825cf) |
| Sign In      | ![](https://github.com/user-attachments/assets/5e060d72-dc22-421e-b050-eff254d97af1) |
| Verify OTP   | ![](https://github.com/user-attachments/assets/c25cc653-f42b-4990-ad76-7c7437196bb3) |
| Employee     | ![](https://github.com/user-attachments/assets/5ef8de02-cc86-4586-bc02-22634cfaacf7) |
| Task         | ![](https://github.com/user-attachments/assets/749d9e0b-3054-427c-98e4-886936185546) |
| Message      | ![](https://github.com/user-attachments/assets/f9b391a9-4747-413f-9b77-8c643192c03d) |
| Profile      | ![](https://github.com/user-attachments/assets/7d452137-3cd4-492f-a688-9aa39ca1a3fd) |
