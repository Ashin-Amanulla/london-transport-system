const saveChangesButton = document.getElementById("saveChangesButton");
const routeSelect = document.getElementById("routeSelect");

const deleteFav = document.getElementById("deleteFav");

saveChangesButton.addEventListener("click", async () => {
  const selectedRoute = routeSelect.value;

  const email = localStorage.getItem("email");

  // Send an HTTP POST request to your Node.js server using Ajax
  const response = await fetch(`/addRoute/${email}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ selectedRoute }),
  });

  // Redirect the user to the personal page if the request was successful
  if (response.ok) {
    window.location.href = `/personal/${email}`;
  }
});

const logout = document.getElementById("logout");
logout.onclick = async () => {
  localStorage.clear();
  // Send an HTTP POST request to your Node.js server using Ajax
  const response = await fetch(`/logout`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  // Redirect the user to the personal page if the request was successful
  if (response.ok) {
    window.location.href = `/`;
  }
};
