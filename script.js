// Customize your profile here
const userProfile = {
    name: "Goutham Josh",
    age: 19,
    status: "Studying Computer Science",
    hobby: "Coder AI"
};

window.onload = () => {
    document.getElementById("name").textContent = `Name: ${userProfile.name}`;
    document.getElementById("age").textContent = `Age: ${userProfile.age}`;
    document.getElementById("status").textContent = `Work/Study: ${userProfile.status}`;
    document.getElementById("hobby").textContent = `Hobby: ${userProfile.hobby}`;

    document.getElementById("toggle-theme").addEventListener("click", () => {
        document.body.classList.toggle("dark");
        document.body.classList.toggle("light");
    });
};
