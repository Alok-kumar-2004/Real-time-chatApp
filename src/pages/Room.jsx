import React, { useEffect, useState } from "react";
import client, {
  COLLECTION_ID_MESSAGES,
  database,
  DATABASE_ID,
} from "../appWriteConfig";
import { ID, Permission, Query, Role } from "appwrite";
import { Trash2, Send } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import { useAuth } from "../utils/AuthContext";

const Room = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      (response) => {
        console.log("real-time", response);

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          console.log("A message was created ...");
          setMessages((prevState) => [response.payload, ...prevState]);
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("A message was deleted ...");
          setMessages((prevState) =>
            prevState.filter((message) => message.$id !== response.payload.$id)
          );
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!messageBody.trim()) return;

    let payLoad = {
      user_id: user.$id,
      username: user.name,
      body: messageBody,
    };

    let permissions = [
        Permission.write(Role.user(user.$id))
    ]
    let response = await database.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payLoad,
      permissions
    );

    console.log("Created", response);
    setMessageBody("");
  };

  const getMessages = async () => {
    const response = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [Query.orderDesc("$createdAt"), Query.limit(100)]
    );
    console.log("RESPONSE", response);
    setMessages(response.documents);
  };

  const deleteMessage = async (message_id) => {
    database.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id);

  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Header />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-transparent">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.$id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="mb-4"
              >
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg font-medium text-indigo-700 drop-shadow-sm"
                >
                  {message?.username ? (
                    <span className="font-semibold">{message.username}</span>
                  ) : (
                    <span className="italic text-gray-600">Anonymous User</span>
                  )}
                </motion.p>
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <motion.p
                      className="text-xs font-medium text-indigo-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {new Date(message.$createdAt).toLocaleString()}
                    </motion.p>
                    {message.$permissions.includes(`delete("user:${user.$id}")`) && (
                      <motion.button
                        whileHover={{ scale: 1.15, rotate: 15 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => deleteMessage(message.$id)}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                      >
                        <Trash2 size={25}/>
                      </motion.button>
                    )}
                  </div>
                  <motion.p
                    className="text-gray-700 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {message.body}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-white shadow-lg p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <textarea
                required
                maxLength="1000"
                placeholder="Type your message..."
                onChange={(e) => setMessageBody(e.target.value)}
                value={messageBody}
                className="w-full resize-none rounded-lg border-2 border-indigo-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-4 pr-20 text-gray-700 bg-gray-50"
                rows="3"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="absolute bottom-3 right-3
                                bg-indigo-600 hover:bg-indigo-700  text-white font-medium rounded-full p-3 shadow-md transition-all duration-200"
                disabled={!messageBody.trim()}
              >
                <Send size={35} />
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Room;
