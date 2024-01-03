import dotenv from "dotenv";
import User from "./models/userModel";
import Job from "./models/jobModel";
import connectDB from "./config/db";
import { faker } from "@faker-js/faker";

dotenv.config();

connectDB();

const fakeData = async () => {
  try {
    // Generate fake user data
    const fakeUsers = Array.from({ length: 10 }, () => {
      const user = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        isAdmin: faker.datatype.boolean(),
      };
      return user;

      // Generate fake job data
      const fakeJob = Array.from({ length: 40 }, () => {
        const Job = {
          title: faker.lorem.words(5),
          companyName: faker.company.buzzPhrase(),
          description: faker.lorem.paragraph(),
          minimumSalary: `${faker.number.float({
            min: 9000,
            max: 18000,
            precision: 0.001,
          })} `,
          maximumSalary: `${faker.number.float({
            min: 25000,
            max: 58000,
            precision: 0.001,
          })} `,

          salaryType: [
            faker.helpers.arrayElement(["Hourly", "Monthly", "Yearly"]),
          ],
          experienceLevel: [
            faker.helpers.arrayElement([
              "Any expericence",
              "Internship",
              "Work remotely",
            ]),
          ],
          location: [faker.helpers.location()],
          postedOn: faker.date.past(),
          expiryDate: faker.date.future(),
          requiredSkills: faker.helpers.arrayElement([
            "PHP",
            "JS",
            "REACT",
            "ORACLE",
            "LARAVEL",
            "NODE",
          ]),

          companyLogo: faker.image.urlPicsumPhotos(),
          employmentType: faker.helpers.arrayElement([
            "Full Time",
            "Part Time",
            "Temporary",
          ]),

          cast: [
            faker.person.fullName(),
            faker.person.fullName(),
            faker.person.fullName(),
          ],
          trailer: faker.internet.url(),
          poster: faker.image.urlPicsumPhotos(),
          runningTime: `${faker.number.float({
            min: 90,
            max: 180,
            precision: 0.001,
          })} minutes`,
          productionStudio: faker.company.buzzPhrase(),
        };
        return movie;
      });
    });
  } catch (error) {
    console.log("error generating data");
  }
};
