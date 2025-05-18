document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-btn');
    const usernameInput = document.getElementById('user-input');
    const statsContainer = document.querySelector('.stats-container');
    const easyProgressCircle = document.querySelector('.easy-progress');
    const mediumProgressCircle = document.querySelector('.medium-progress');
    const hardProgressCircle = document.querySelector('.hard-progress');
    const easyLabel = document.getElementById('easy-label');
    const mediumLabel = document.getElementById('medium-label');
    const hardLabel = document.getElementById('hard-label');
    const cardStatsContainer = document.querySelector('.stats-cards');
    const loadingMessage = document.querySelector('.loading-message'); 

    validateUsername = (username) => {
        if (username.trim() === '') {
            alert('Username should not be empty');
            return false;
        }
        return true;
    }

    async function fetchUserDetails(username) {
        try {
            searchButton.disabled = true;
            loadingMessage.style.display = "block";
            searchButton.style.display = "none";
            statsContainer.style.display = "none"; // Hide stats initially

            // Use environment variable or fallback to localhost for development
            const proxyUrl = 'https://leetcode-metrics-tracker-cors-proxy.onrender.com/api/';
            const targetUrl = `graphql/`;

            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");
            myHeaders.append("origin", window.location.origin);
            myHeaders.append("x-requested-with", "XMLHttpRequest");

            const graphql = JSON.stringify({
                query: `
                    query userSessionProgress($username: String!) {
                        allQuestionsCount {
                            difficulty
                            count
                        }
                        matchedUser(username: $username) {
                            submitStats {
                                acSubmissionNum {
                                    difficulty
                                    count
                                    submissions
                                }
                            }
                        }
                    }
                `,
                variables: { username: `${username}` }
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
                redirect: "follow"
            };

            const response = await fetch(proxyUrl + targetUrl, requestOptions);
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Unable to fetch the User details: ${response.status} ${response.statusText}`);
            }
            const parsedData = await response.json();
            displayUserData(parsedData);

        } catch (error) {
            console.error('Error:', error);
            statsContainer.innerHTML = `<p>No Data Found</p>`;
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
            loadingMessage.style.display = "none";
            statsContainer.style.display = "block"; // Reveal the stats container
            statsContainer.style.opacity = "0"; // Reset opacity for transition
            setTimeout(() => {
                statsContainer.style.opacity = "1"; // Trigger fade-in
            }, 50);
            searchButton.style.display = "block";
        }
    }

    updateProgress = (solved, total, label, circle) => {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty('--progress-degree', `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    displayUserData = (parsedData) => {
        const totalQues = parsedData.data.allQuestionsCount[0].count;
        const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
        const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
        const totalHardQues = parsedData.data.allQuestionsCount[3].count;

        const solvedTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const solvedEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

        updateProgress(solvedEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedHardQues, totalHardQues, hardLabel, hardProgressCircle);

        const cardData = [
            { label: "Overall Submissions", value: parsedData.data.matchedUser.submitStats.acSubmissionNum[0].submissions },
            { label: "Overall Easy Submissions", value: parsedData.data.matchedUser.submitStats.acSubmissionNum[1].submissions },
            { label: "Overall Medium Submissions", value: parsedData.data.matchedUser.submitStats.acSubmissionNum[2].submissions },
            { label: "Overall Hard Submissions", value: parsedData.data.matchedUser.submitStats.acSubmissionNum[3].submissions },
        ];

        cardStatsContainer.innerHTML = cardData.map(
            data => `
                <div class='card'>
                    <h3>${data.label}</h3>
                    <p>${data.value}</p>
                </div>
            `
        ).join("");
    }

    searchButton.addEventListener('click', () => {
        const username = usernameInput.value;
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});
