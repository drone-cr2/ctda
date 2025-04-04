import React, { lazy, Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChartIcon,
  UsersIcon,
  TimerIcon,
  CloudIcon,
  SmileIcon,
  FlameIcon,
  MapIcon,
  ListIcon,
} from "lucide-react";

const LollipopChart = lazy(() => import("./LollipopChart"));
const HorizontalBarChart = lazy(() => import("./HorizontalBarChart"));
const ContributorsList = lazy(() => import("./ContributorsList"));
const WordCloud = lazy(() => import("./WordCloud"));
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75 } },
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.75, delay: 0.25 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full h-full text-gray-900 bg-gradient-to-b from-gray-50 to-white font-mono flex flex-col min-h-screen justify-center"
    >
      <div className="p-4 md:p-10 py-16 rounded cursor-pointer">
        {users.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-20 mt-4 w-full max-w-sm mx-auto"
          >
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
          </motion.div>
        )}

        <Suspense
          fallback={
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-indigo-600 border-b-2"></div>
            </div>
          }
        >
          <AnimatePresence>
            <>
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="w-full space-y-16 md:space-y-16"
              >
                <motion.div
                  variants={chartVariants}
                  className="p-6 sm:p-2 bg-white rounded-lg shadow-lg w-full"
                >
                  <Stats />
                </motion.div>

                {/* Chat Timeline */}
                <motion.div
                  variants={sectionVariants}
                  className="bg-white p-6 sm:p-2"
                >
                  <div className="bg-gray-100 p-6 sm:p-2">
                    <div className="max-w-screen-xl mx-auto space-y-6">
                      {/* Dashboard Header */}
                      <h1 className="text-3xl font-bold text-gray-900 text-center flex items-center justify-center">
                        <LineChartIcon className="mr-2" /> Chat Timeline Dashboard
                      </h1>

                      {/* Grid Layout for Charts */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Bar Chart */}
                        <motion.div
                          variants={chartVariants}
                          className="bg-white shadow-md rounded-lg p-4 border border-gray-300"
                        >
                          <div className="w-full overflow-hidden">
                            <PlotlyBarChart url="http://127.0.0.1:8080/timeline" />
                          </div>
                        </motion.div>

                        {/* Line Chart */}
                        <motion.div
                          variants={chartVariants}
                          className="bg-white shadow-md rounded-lg p-4 border border-gray-300"
                        >
                          <div className="w-full overflow-hidden">
                            <LinePlot url="http://127.0.0.1:8080/timeline" />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Contributors */}
                {selectedUser === "Overall" && (
                  <motion.div
                    variants={sectionVariants}
                    className="bg-white p-6 sm:p-2"
                  >
                    <div className="bg-gray-100 p-6 sm:p-2">
                      <div className="space-y-6 md:space-y-10 px-2 md:px-4 w-full max-w-screen-xl mx-auto">
                        <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center">
                          <UsersIcon className="mr-2" /> Contributors
                        </h1>

                        {/* Top Contributors List */}
                        <div className="w-full p-2 md:p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                          <ContributorsList />
                        </div>

                        {/* Bar Chart Below Contributors */}
                        <div className="w-full p-2 md:p-4">
                          <HorizontalBarChart apiUrl="http://127.0.0.1:8080/top-users" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Busiest */}
                <motion.div
                  variants={sectionVariants}
                  className="bg-white p-6 sm:p-2"
                >
                  <div className="bg-gray-100 p-6 sm:p-2">
                    <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                      <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center">
                        <FlameIcon className="mr-2" /> Busiest
                      </h1>

                      {/* Responsive Chart Grid */}
                      <div className="flex flex-col md:flex-row justify-evenly md:space-x-6 w-full max-w-screen-xl mx-auto overflow-hidden">
                        {[
                          {
                            pieUrl: "buzy-months/pie",
                            barUrl: "buzy-months/bar",
                          },
                          {
                            pieUrl: "daily-wordcount/pie",
                            barUrl: "daily-wordcount/bar",
                          },
                          { pieUrl: "buzy-days/pie", barUrl: "buzy-days/bar" },
                        ].map(({ pieUrl, barUrl }, i) => (
                          <motion.div
                            variants={chartVariants}
                            key={i}
                            className="flex-1 flex flex-col space-y-4 items-center my-3 md:my-0"
                          >
                            <div className="w-full min-h-[200px] md:min-h-[300px] flex items-center justify-center">
                              <PieChart
                                url={`http://127.0.0.1:8080/${pieUrl}`}
                              />
                            </div>
                            <div className="w-full min-h-[200px] md:min-h-[300px] flex items-center justify-center">
                              <PlotlyBarChart
                                url={`http://127.0.0.1:8080/${barUrl}`}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Activity HeatMap */}
                <motion.div
                  variants={sectionVariants}
                  className="bg-white p-6 sm:p-2"
                >
                  <div className="bg-gray-100 p-6 sm:p-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center flex items-center justify-center">
                      <MapIcon className="mr-2" /> Activity HeatMap
                    </h1>
                    <div className="flex justify-center items-center w-full overflow-hidden">
                      <div className="w-full bg-white rounded-lg p-6 sm:p-2 shadow-inner">
                        <UserActivityHeatmap />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Most Commons */}
                <motion.div
                  variants={sectionVariants}
                  className="bg-white p-6 sm:p-2"
                >
                  <div className="bg-gray-100 p-6 sm:p-2">
                    <div className="space-y-4 md:space-y-8 px-2 md:px4">
                      <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center">
                        <SmileIcon className="mr-2" /> Most Commons
                      </h1>

                      <div className="flex flex-col md:flex-row justify-center w-full max-w-screen-xl mx-auto overflow-hidden md:space-x-10 my-4">
                        <motion.div
                          variants={chartVariants}
                          className="w-full md:w-1/2 p-2 md:p-4"
                        >
                          <HorizontalBarChart apiUrl="http://127.0.0.1:8080/top-words" />
                        </motion.div>
                        <motion.div
                          variants={chartVariants}
                          className="w-full md:w-1/2 p-2 md:p-4"
                        >
                          <MostFrequentEmojis />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Sentiment Analysis */}
                <motion.div
                  variants={sectionVariants}
                  className="bg-white p-6 sm:p-2"
                >
                  <div className="bg-gray-100 p-6 sm:p-2">
                    <div className="space-y-8 md:space-y-12 px-3 md:px-6">
                      <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center">
                        <ListIcon className="mr-2" /> Sentiment Analysis
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
                      ].map(
                        ({ title, urlPrefix, component: ChartComponent }) => (
                          <motion.div
                            variants={chartVariants}
                            key={title}
                            className="space-y-4 md:space-y-8 px-2 md:px-4"
                          >
                            <p className="text-xl text-center">{title}</p>
                            <div className="flex flex-col md:flex-row justify-center w-full max-w-screen-xl mx-auto overflow-hidden md:space-x-5 my-4">
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  variants={chartVariants}
                                  key={i}
                                  className="w-full md:w-1/3 p-2 md:p-4"
                                >
                                  <ChartComponent
                                    url={`http://127.0.0.1:8080/${urlPrefix}/${i}`}
                                  />
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )
                      )}

                      {/* Contributors Table (Only for 'Overall' user) */}
                      {selectedUser === "Overall" && (
                        <motion.div
                          variants={chartVariants}
                          className="space-y-4 md:space-y-8 px-2 md:px-4"
                        >
                          <p className="text-xl text-center">Contributors</p>
                          <div className="flex flex-col md:flex-row justify-center w-full max-w-screen-xl mx-auto overflow-hidden md:space-x-0 my-4">
                            {["Negative", "Neutral", "Positive"].map(
                              (sen, i) => (
                                <motion.div
                                  variants={chartVariants}
                                  key={i}
                                  className="w-full md:w-1/3 p-2 md:p-4"
                                >
                                  <LollipopChart
                                    url={`http://127.0.0.1:8080/sen-contribution/${i}`}
                                    sen={sen}
                                  />
                                </motion.div>
                              )
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Busiest Hours */}
                <motion.div
                  variants={sectionVariants}
                  className="bg-white p-6 sm:p-2"
                >
                  <div className="bg-gray-100 p-6 sm:p-2">
                    <div className="space-y-4 md:space-y-8 px-2 md:px-4">
                      <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center">
                        <TimerIcon className="mr-2" /> Busiest Hours
                      </h1>

                      <div className="flex justify-center w-full max-w-screen-xl mx-auto overflow-hidden">
                        <motion.div
                          variants={chartVariants}
                          className="w-full p-2 md:p-4"
                        >
                          <PlotlyBarChart url="http://127.0.0.1:8080/buzy-hours" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* WordCloud */}
                <motion.div
                  variants={sectionVariants}
                  className="bg-white p-6 sm:p-2"
                >
                  <div className="bg-gray-100 p-6 sm:p-2">
                    <div className="space-y-4 md:space-y-8">
                      <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center">
                        <CloudIcon className="mr-2" /> WordCloud
                      </h1>
                      <div className="flex justify-center">
                        <WordCloud />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          </AnimatePresence>
        </Suspense>
      </div>
    </motion.div>
  );
}

export default Results;
