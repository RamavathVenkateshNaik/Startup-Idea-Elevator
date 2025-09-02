import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// create context
const IdeaContext = createContext();

// custom hook to use context
export const useIdeas = () => {
  return useContext(IdeaContext);
};

// small function to give random rating
const getRandomRating = () => Math.floor(Math.random() * 100) + 1;

// simple feedback messages based on rating
const giveFeedback = (score) => {
  if (score >= 90) return "🚀 Amazing idea! Very strong potential.";
  if (score >= 70) return "⭐ Good concept, can work with improvements.";
  if (score >= 50) return "🤔 Not bad, but needs polishing.";
  return "💭 Needs more thought, try again!";
};

export const IdeaProvider = ({ children }) => {
  const [ideas, setIdeas] = useState([]);
  const [votes, setVotes] = useState([]); // keep track of voted idea ids
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadIdeas();
    loadVotes();
  }, []);

  const loadIdeas = async () => {
    try {
      const data = await AsyncStorage.getItem('ideas');
      if (data) setIdeas(JSON.parse(data));
    } catch (e) {
      console.log("error reading ideas", e);
    }
  };

  const saveIdeas = async (newIdeas) => {
    try {
      await AsyncStorage.setItem('ideas', JSON.stringify(newIdeas));
    } catch (e) {
      console.log("error saving ideas", e);
    }
  };

  const loadVotes = async () => {
    try {
      const v = await AsyncStorage.getItem('votes');
      if (v) setVotes(JSON.parse(v));
    } catch (e) {
      console.log("error loading votes", e);
    }
  };

  const saveVotes = async (newVotes) => {
    try {
      await AsyncStorage.setItem('votes', JSON.stringify(newVotes));
    } catch (e) {
      console.log("error saving votes", e);
    }
  };

  const submitIdea = async (data) => {
    setLoading(true);

    // fake delay to mimic server
    await new Promise((r) => setTimeout(r, 1000));

    const score = getRandomRating();
    const fb = giveFeedback(score);

    const idea = {
      id: Date.now().toString(),
      ...data,
      rating: score,
      feedback: fb,
      votes: 0,
      createdAt: new Date().toISOString(),
    };

    const updated = [...ideas, idea];
    setIdeas(updated);
    await saveIdeas(updated);

    setLoading(false);

    Alert.alert("Idea Submitted", `AI Rating: ${score}/100 \n${fb}`);
  };

  const voteIdea = async (id) => {
    if (votes.includes(id)) {
      Alert.alert("Already Voted", "You can only vote once for an idea!");
      return false;
    }

    const updatedIdeas = ideas.map((i) =>
      i.id === id ? { ...i, votes: i.votes + 1 } : i
    );
    const updatedVotes = [...votes, id];

    setIdeas(updatedIdeas);
    setVotes(updatedVotes);

    await saveIdeas(updatedIdeas);
    await saveVotes(updatedVotes);

    Alert.alert("Vote Counted", "Thanks for voting!");
    return true;
  };

  const getTopIdeas = (n = 5) => {
    return [...ideas].sort((a, b) => b.votes - a.votes).slice(0, n);
  };

  const sortIdeas = (by = 'rating') => {
    return [...ideas].sort((a, b) => {
      if (by === 'votes') return b.votes - a.votes;
      if (by === 'new') return new Date(b.createdAt) - new Date(a.createdAt);
      return b.rating - a.rating;
    });
  };

  return (
    <IdeaContext.Provider value={{ ideas, loading, submitIdea, voteIdea, getTopIdeas, sortIdeas }}>
      {children}
    </IdeaContext.Provider>
  );
};
