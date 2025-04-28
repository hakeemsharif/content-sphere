import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function useFetchActiveUser() {
  const [onlineUsers, setOnlineUsers] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, } = await supabase.auth.getUser();

      const channel = supabase.channel("tracking");
      channel
        .on("presence", { event: "sync" }, () => {
          // console.log('Synced presence state: ', channel.presenceState())

          // Using a Set to collect unique user IDs
          const userIds = new Set();

          // Iterate through all presence entries
          for (const id in channel.presenceState()) {
            // For each user's presence entries
            channel.presenceState()[id].forEach((presence) => {
              // Add user_id to the Set if it exists
              if (presence.user_id) {
                userIds.add(presence.user_id);
              }
            });
          }

          setOnlineUsers(userIds.size);
        })

        .subscribe(async (status) => {
          if (status === "SUBSCRIBED") {
            await channel.track({
              online_at: new Date().toISOString(),
              user_id: user.id,
            });
          }
        });

      return () => {
        channel.untrack();
        channel.unsubscribe();
      };
    };

    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {onlineUsers};
}

// REF https://www.youtube.com/watch?v=IfImokndvfM (With AI Assist)