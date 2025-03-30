# **Frontend Challenge - Successfully Completed ✅**  

🚀 **Welcome to the Frontend Challenge Repository!**  
This project was completed as part of a frontend coding challenge by **[@Abdo-112002](https://github.com/Abdo-112002)**, and I am successfully developed and implemented all functionalities with modern frontend technologies.  

---

## 📌 **Project Overview**  
This project was built as a response to a frontend challenge, demonstrating expertise in:  
✅ **Modern UI development**  
✅ **State management**  
✅ **API integration**  
✅ **Performance optimization**  
✅ **Best practices in frontend engineering**  

---

## 🔧 **Tech Stack & Tools**  
This project was developed using the latest technologies to ensure scalability, maintainability, and performance:  

- **Framework:** [Next.js](https://nextjs.org/)  
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)  
- **UI Library:** [ShadCN UI](https://ui.shadcn.com/)  
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)  
- **Data Table:** [TanStack Table](https://tanstack.com/table/latest)  
- **Styling:** Tailwind CSS  
- **API Communication:** Axios  
- **File Uploads:** Cloudinary  

---

## 🎯 **Features Implemented**  
✔ **Fully Responsive UI** – Optimized for all devices  
✔ **State Management with Zustand** – Efficient & scalable  
✔ **Dynamic Table (Sorting, Filtering, Pagination, Selection)**  
✔ **CRUD Operations with Dialog Modals**  
✔ **Form Handling & Validation with React Hook Form + Zod**  
✔ **Optimized API Calls using Axios**  
✔ **File Upload Support (Integrated with Cloudinary)**  
✔ **User-Friendly Loading & Error Handling**  

---

### **Environment Variables**  
Create a `.env.local` file and add the required environment variables:  
```env
NEXT_PUBLIC_API_URL="https://api.escuelajs.co/api/v1"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="secretkey"
UPLOADTHING_TOKEN='secrettoken'
UPSTASH_REDIS_REST_URL="https://"
UPSTASH_REDIS_REST_TOKEN="secrettoken"
```

## 🛠 **Project Structure**  
```
📦 Frontend-Challenge
src/
├─ app/
│  ├─ api/
│  │  ├─ auth/
│  │  │  └─ [...nextauth]/
│  │  │     └─ route.ts
│  │  └─ uploadthing/
│  │     ├─ core.ts
│  │     └─ route.ts
│  ├─ dashboard/
│  │  ├─ products/
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ not-found.tsx
│  ├─ page.tsx
│  └─ providers.tsx
├─ components/
│  ├─ dashboard/
│  │  ├─ products/
│  │  │  ├─ product-table-actions.tsx
│  │  │  ├─ product-table-columns.tsx
│  │  │  ├─ product-table-dialogs.tsx
│  │  │  ├─ product-table-manage-dialog.tsx
│  │  │  ├─ product-table-model.dialog.tsx
│  │  │  └─ product-table.tsx
│  │  ├─ nav-group.tsx
│  │  ├─ nav-header.tsx
│  │  ├─ overview-card.tsx
│  │  └─ user-profile.tsx
│  ├─ data-table/
│  │  ├─ data-table-action.tsx
│  │  ├─ data-table-column-header.tsx
│  │  ├─ data-table-delete-dialog.tsx
│  │  ├─ data-table-expandable-button.tsx
│  │  ├─ data-table-faceted-filter.tsx
│  │  ├─ data-table-pagination.tsx
│  │  ├─ data-table-skeleton.tsx
│  │  ├─ data-table-toolbar.tsx
│  │  ├─ data-table-view-options.tsx
│  │  ├─ data-table.tsx
│  │  └─ index.ts
│  ├─ forms/
│  │  └─ form-login.tsx
│  ├─ layouts/
│  │  ├─ dashboard-header.tsx
│  │  └─ dashboard-sidebar.tsx
│  ├─ theme/
│  │  └─ theme-toggle.tsx
│  ├─ ui/
│  │  ├─ file-uploader/
│  │  │  ├─ dropzone-area.tsx
│  │  │  ├─ error-display.tsx
│  │  │  ├─ file-preview-list.tsx
│  │  │  ├─ index.tsx
│  │  │  └─ upload-progress.tsx
│  │  ├─ accordion.tsx
│  │  ├─ alert-dialog.tsx
│  │  ├─ alert.tsx
│  │  ├─ aspect-ratio.tsx
│  │  ├─ avatar.tsx
│  │  ├─ badge.tsx
│  │  ├─ breadcrumb.tsx
│  │  ├─ button.tsx
│  │  ├─ calendar.tsx
│  │  ├─ card.tsx
│  │  ├─ carousel.tsx
│  │  ├─ chart.tsx
│  │  ├─ checkbox.tsx
│  │  ├─ collapsible.tsx
│  │  ├─ command.tsx
│  │  ├─ dialog.tsx
│  │  ├─ drawer.tsx
│  │  ├─ dropdown-menu.tsx
│  │  ├─ editable.tsx
│  │  ├─ form.tsx
│  │  ├─ input.tsx
│  │  ├─ kbd.tsx
│  │  ├─ label.tsx
│  │  ├─ navigation-menu.tsx
│  │  ├─ pagination.tsx
│  │  ├─ popover.tsx
│  │  ├─ progress.tsx
│  │  ├─ scroll-area.tsx
│  │  ├─ select.tsx
│  │  ├─ separator.tsx
│  │  ├─ sheet.tsx
│  │  ├─ sidebar.tsx
│  │  ├─ skeleton.tsx
│  │  ├─ sonner.tsx
│  │  ├─ table.tsx
│  │  ├─ textarea.tsx
│  │  ├─ toggle-group.tsx
│  │  ├─ toggle.tsx
│  │  └─ tooltip.tsx
│  ├─ account-menu.tsx
│  ├─ combobox.tsx
│  ├─ confirm-dialog.tsx
│  ├─ dynamic-breadcrumb.tsx
│  ├─ file-card.tsx
│  ├─ icons.tsx
│  ├─ long-text.tsx
│  ├─ page-header.tsx
│  ├─ password-input.tsx
│  ├─ select-dropdown.tsx
│  ├─ shell.tsx
│  └─ visually-hidden-input.tsx
├─ config/
│  └─ dashboard.ts
├─ hooks/
│  ├─ use-mobile.ts
│  └─ useAuth.ts
├─ lib/
│  ├─ api/
│  │  ├─ auth.ts
│  │  └─ products.ts
│  ├─ validation/
│  │  ├─ auth.ts
│  │  └─ products.ts
│  ├─ axios.ts
│  ├─ composition.ts
│  ├─ export.ts
│  ├─ handle-error.ts
│  ├─ rate-limit.ts
│  ├─ uploadthing.ts
│  └─ utils.ts
├─ store/
│  ├─ dialogs.ts
│  ├─ file-uploader.ts
│  └─ products.ts
├─ types/
│  └─ index.ts
├─ .env.example
└─ middleware.ts

```

---

## 📜 **License**  
This project is open-source under the MIT License. Feel free to fork, modify, and use it for learning purposes.

---

## 👨‍💻 **Developer**  
**This challenge was originally posted by [@Abdo-112002](https://github.com/Abdo-112002), but I am, successfully developed and completed it.**  

---

## ⭐ **Show Your Support**  
If you found this project useful, consider giving it a ⭐ on GitHub! 🚀  

