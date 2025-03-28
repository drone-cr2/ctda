import React, { lazy, Suspense, useState, useEffect } from "react";
import ContributorsList from "./ContributorsList";
const WordCloud = lazy(() => import("./WordCloud"));
const TablePlot = lazy(() => import("./TablePlot"));
const PieChart = lazy(() => import("./PieChart"));
const LinePlot = lazy(() => import("./LinePlot"));
const UserActivityHeatmap = lazy(() => import("./UserActivityHeatmap"));
const MostFrequentEmojis = lazy(() => import("./MostFrequentEmojis"));
const Stats = lazy(() => import("./Stats"));
const PlotlyBarChart = lazy(() => import("./PlotlyPlot"));

function Results({ users, selectedUser, setSelectedUser }) {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setRefreshKey((prevKey) => prevKey + 1);
  }, [selectedUser]);

  const handleUserSelection = async (event) => {
    const selected = event.target.value;
    setSelectedUser(selected);

    if (selected) {
      try {
        const response = await fetch("http://127.0.0.1:8080/set-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: selected }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to set user");
        }
      } catch (error) {
        console.error("Error setting user:", error);
      }
    }
  };

  return (
    <div className="w-full h-full text-gray-900 bg-gradient-to-b from-gray-50 to-white font-mono flex flex-col min-h-screen justify-center">
      <div className="p-4 md:p-10 py-16 rounded">
        {users.length > 0 && (
          <div className="mb-20 mt-4 w-full max-w-sm mx-auto">
            <label className="block text-sm font-semibold text-center">
              Switch User:
            </label>
            <select
              value={selectedUser}
              onChange={handleUserSelection}
              className="border p-2 rounded w-full mt-1 bg-white text-gray-900 border-gray-900/20"
            >
              <option value="">-- Choose a user --</option>
              {users.map((user, index) => (
                <option key={index} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
        )}

        <Suspense
          fallback={
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-indigo-600 border-b-2"></div>
            </div>
          }
        >
          <>
            <div className="w-full space-y-16 md:space-y-16">
              <div className="p-6 bg-white rounded-lg shadow-lg w-full">
                <Stats />
              </div>

              {/* Chat Timeline */}
              <div className="bg-white p-6">
                <div className="bg-gray-100 p-6">
                  <div className="max-w-screen-xl mx-auto space-y-6">
                    {/* Dashboard Header */}
                    <h1 className="text-3xl font-bold text-gray-900 text-center">
                      Chat Timeline Dashboard
                    </h1>

                    {/* Grid Layout for Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Bar Chart */}
                      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
                        <div className="w-full overflow-hidden">
                          <PlotlyBarChart url="http://127.0.0.1:8080/timeline" />
                        </div>
                      </div>

                      {/* Line Chart */}
                      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300">
                        <div className="w-full overflow-hidden">
                          <LinePlot url="http://127.0.0.1:8080/timeline" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contributors */}
              {selectedUser === "Overall" && (
                <div className="bg-white p-6">
                  <div className="bg-gray-100 p-6">
                    <div className="space-y-6 md:space-y-10 px-2 md:px-4 w-full max-w-screen-xl mx-auto">
                      <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-900">
                        Contributors
                      </h1>

                      {/* Top Contributors List */}
                      <div className="w-full p-2 md:p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                        <ContributorsList />
                      </div>

                      {/* Bar Chart Below Contributors */}
                      <div className="w-full p-2 md:p-4">
                        <PlotlyBarChart url="http://127.0.0.1:8080/top-users" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Busiest */}
              <div className="bg-white p-6">
                <div className="bg-gray-100 p-6">
                  <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                    <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-900">
                      Busiest
                    </h1>

                    {/* Pie Charts on Top */}
                    <div className="flex flex-col md:flex-row justify-evenly md:space-x-6 w-full max-w-screen-xl mx-auto overflow-hidden">
                      <div className="flex-1 min-h-[200px] md:min-h-[300px] flex items-center justify-center">
                        <PieChart url="http://127.0.0.1:8080/buzy-months/pie" />
                      </div>
                      <div className="flex-1 min-h-[200px] md:min-h-[300px] flex items-center justify-center">
                        <PieChart url="http://127.0.0.1:8080/daily-wordcount/pie" />
                      </div>
                      <div className="flex-1 min-h-[200px] md:min-h-[300px] flex items-center justify-center">
                        <PieChart url="http://127.0.0.1:8080/buzy-days/pie" />
                      </div>
                    </div>

                    {/* Bar Charts on Bottom */}
                    <div className="flex flex-col md:flex-row justify-evenly md:space-x-6 w-full max-w-screen-xl mx-auto overflow-hidden">
                      <div className="flex-1 min-h-[200px] md:min-h-[300px] flex items-center justify-center my-2">
                        <PlotlyBarChart url="http://127.0.0.1:8080/buzy-months/bar" />
                      </div>
                      <div className="flex-1 min-h-[200px] md:min-h-[300px] flex items-center justify-center my-2">
                        <PlotlyBarChart url="http://127.0.0.1:8080/daily-wordcount/bar" />
                      </div>
                      <div className="flex-1 min-h-[200px] md:min-h-[300px] flex items-center justify-center my-2">
                        <PlotlyBarChart url="http://127.0.0.1:8080/buzy-days/bar" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity HeatMap */}
              <div className="bg-white p-6">
                <div className="bg-gray-100 p-6">
                  <div className="bg-white shadow-md rounded-lg p-4 md:p-6 w-full max-w-screen-xl mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
                      Activity HeatMap
                    </h1>

                    <div className="flex justify-center items-center w-full overflow-hidden">
                      <div className="w-full bg-white rounded-lg p-3 md:p-6 shadow-inner">
                        <UserActivityHeatmap />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Most Commons */}
              <div className="space-y-4 md:space-y-8 px-2 md:px4">
                <h1 className="text-left text-2xl md:text-3xl font-bold text-gray-900">
                  Most Commons
                </h1>

                <div className="flex flex-col md:flex-row justify-center w-full max-w-screen-xl mx-auto overflow-hidden md:space-x-10 my-4">
                  <div className="w-full md:w-1/2 p-2 md:p-4">
                    <PlotlyBarChart url="http://127.0.0.1:8080/top-words" />
                  </div>
                  <div className="w-full md:w-1/2 p-2 md:p-4">
                    <MostFrequentEmojis />
                  </div>
                </div>
              </div>

              {/* Sentiment Analysis */}
              <div className="bg-white p-6">
                <div className="bg-gray-100 p-6">
                  <div className="space-y-8 md:space-y-12 px-3 md:px-6">
                    <h1 className="text-left text-2xl md:text-3xl font-bold text-gray-900">
                      Sentiment Analysis
                    </h1>

                    {/* Weekly Activity, Common Words, Activity Overview, Activity Timeline */}
                    {[
                      {
                        title: "Weekly Activity",
                        urlPrefix: "sen-activity-map",
                        component: PlotlyBarChart,
                      },
                      {
                        title: "Common Words",
                        urlPrefix: "sen-common-words",
                        component: PlotlyBarChart,
                      },
                      {
                        title: "Activity Overview",
                        urlPrefix: "sen-timeline",
                        component: PlotlyBarChart,
                      },
                      {
                        title: "Activity Timeline",
                        urlPrefix: "sen-timeline",
                        component: LinePlot,
                      },
                    ].map(({ title, urlPrefix, component: ChartComponent }) => (
                      <div
                        key={title}
                        className="space-y-4 md:space-y-8 px-2 md:px-4"
                      >
                        <div className="flex flex-col md:flex-row justify-center w-full max-w-screen-xl mx-auto overflow-hidden md:space-x-5 my-4">
                          {[0, 1, 2].map((i) => (
                            <div key={i} className="w-full md:w-1/3 p-2 md:p-4">
                              <ChartComponent
                                url={`http://127.0.0.1:8080/${urlPrefix}/${i}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Contributors Table (Only for 'Overall' user) */}
                    {selectedUser === "Overall" && (
                      <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                        
                        <div className="flex flex-col md:flex-row justify-center w-full max-w-screen-xl mx-auto overflow-hidden md:space-x-0 my-4">
                          {["Negative", "Neutral", "Positive"].map((sen, i) => (
                            <div key={i} className="w-full md:w-1/3 p-2 md:p-4">
                              <TablePlot
                                url={`http://127.0.0.1:8080/sen-contribution/${i}`}
                                sen={sen}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Busiest Hours */}
              <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                <h1 className="text-left text-2xl md:text-3xl font-bold text-gray-900">
                  Busiest Hours
                </h1>

                <div className="flex justify-center w-full max-w-screen-xl mx-auto overflow-hidden">
                  <div className="w-full p-2 md:p-4">
                    <PlotlyBarChart url="http://127.0.0.1:8080/buzy-hours" />
                  </div>
                </div>
              </div>

              {/* WordCloud */}
              <div className="space-y-4 md:space-y-8">
                <h1 className="text-left text-2xl md:text-3xl font-bold text-gray-900">
                  WordCloud
                </h1>
                <div className="flex justify-center">
                  <WordCloud />
                </div>
              </div>
            </div>
          </>
        </Suspense>
      </div>
    </div>
  );
}

export default Results;
