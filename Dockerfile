# בחר את התמונה הבסיסית של Node.js
FROM node:18

# הגדר את תיקיית העבודה בתוך הקונטיינר
WORKDIR /usr/src/app

# העתק את קבצי ה-package.json וה-package-lock.json
COPY package*.json ./

# התקן את התלויות
RUN npm install

# העתק את שאר הקבצים
COPY . .

# חשוף את הפורט שבו השרת יפעל
EXPOSE 4000

# הפעל את השרת
CMD ["npm", "start"]
