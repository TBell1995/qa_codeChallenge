import { EmployeeHandler } from "./pageObjects/EmployeeHandler";

const em = new EmployeeHandler();

describe("Employee Manager", () => {
  beforeEach(async () => {
    await em.navigate();
  });
  afterAll(async () => {
    await em.quit();
  });
  it("can add a new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "test person",
      phone: "1234567890",
      title: "test result",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("test person");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("test person");
    expect(employee.phone).toEqual("1234567890");
    expect(employee.title).toEqual("test result");
  });
  it("can edit an existing employee", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Grand Poobah" });
    await em.saveChanges();
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "Grand Poobah",
    });
  });
});
describe("Challenge 3 tests", () => {

  it("Test 1, can add a new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "Dangeruss",
      phone: "1212121212",
      title: "QB",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("Dangeruss");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("Dangeruss");
    expect(employee.phone).toEqual("1212121212");
    expect(employee.title).toEqual("QB");
  });
  it("Test 2, can cancel an edit", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({title: "RB"});
    await em.cancelChanges();
    let employee = await em.getEmployeeInfo();
    expect(employee.title).toEqual("CEO");
  });
  it("Test 3, can navigate away without saving does not save changes", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({title: "CFO"});
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("Bernice Ortiz");
    let employee = await em.getEmployeeInfo();
    expect(employee.title).toEqual("CEO");
  });
});