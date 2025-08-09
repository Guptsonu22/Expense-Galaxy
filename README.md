# Expense Galaxy – Personal Expense Tracker  

A modern, dark-themed *Personal Expense Tracker* that helps you record daily expenses, categorize them, and view insightful reports — all in one place.  

---

## 📌 Features  

1. *Expense Management*  
   - Add, update, and delete expenses.  
   - Assign expenses to categories like *Food & Drink, Travel, Housing, Shopping, Groceries*, etc.  
   - View total amount spent in the current month.  

2. *Category Management*  
   - Create, edit, or delete custom expense categories.  
   - Color-coded categories for quick identification in reports.  

3. *Monthly Overview*  
   - Beautiful *pie chart* showing spending distribution.  
   - Displays total spending amount for the month.  

4. *AI Spending Insights* (Optional)  
   - Generate AI-based financial insights on your spending habits.  
   - Identify where you’re overspending and get suggestions for saving money.  

5. *Modern UI*  
   - Dark theme for an elegant look.  
   - Fully responsive design.  

---

## 🛠 Tech Stack  

*Backend:*  
- Spring Boot (REST API)  
- Spring Data JPA (Database access)  
- Spring Security (Authentication)  
- MySQL / PostgreSQL  

*Frontend:*  
- React.js  
- Chart.js / Recharts (Data visualization)  
- Axios (API calls)  

---

## 📸 Screenshots  

<img width="1904" height="938" alt="image" src="https://github.com/user-attachments/assets/47cece08-a75a-495b-b048-72a9ef83349d" />
 

---

Run:
mvn spring-boot:run

Frontend Setup
cd ../frontend
npm install
npm start

📜 License
This project is licensed under the MIT License — feel free to use and modify.


## 🚀 Installation  

### Backend Setup  

git clone https://github.com/yourusername/expense-galaxy.git
cd expense-galaxy/backend

Edit application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/expense_galaxy
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
