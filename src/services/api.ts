interface FaceSwapResponse {
  id: string;
  job_id: string;
  restarted: number;
  finished: number;
  generations: {
    img: string;
  }[];
  progress: number;
  status: string;
  source_path: string;
  output_path: string;
}

//task response
// {
//   "queue_size": 1,
//   "status": "queued",
//   "tasks": [
//       {
//           "completed_at": null,
//           "created_at": "2024-12-12T15:00:45.069230",
//           "id": "8eaf4c3b-9d3d-4a6f-a00d-4971a91f92c0",
//           "output_path": null,
//           "source_path": "https://rogneogamer.moonshine-studio.net/uploads/1733450429950-8okq7amvlfd.png",
//           "status": "queued",
//           "target_path": "https://r2.web.moonshine.tw/msweb/rogneogamer/prototype/video/S1_M.mp4"
//       }
//   ]
// }
// interface VideoTaskResponse {
//   queue_size: number;
//   status: string;
//   tasks: {
//     completed_at: string | null;
//     created_at: string;
//     id: string;
//     output_path: string | null;
//     source_path: string;
//     status: string;
//     target_path: string;
//   }[];
// }

export const API_BASE_URL = "https://rogneogamer-api.moonshine-studio.net";

export const faceSwapApi = {
  //YESTPOST
  testPost: async (): Promise<FaceSwapResponse> => {
    const response = await fetch(`${API_BASE_URL}/testpost`, {
      method: "POST",
      body: JSON.stringify({
        test: "success",
      }),
    });
    return await response.json();
  },
  // 圖片換臉
  swapFace: async (
    source_image: File,
    swap_image_url: string
  ): Promise<FaceSwapResponse> => {
    try {
      const formData = new FormData();
      formData.append("source_image", source_image);
      formData.append("swap_image_url", swap_image_url);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "141cd239-d83c-4188-b9f9-0ae18be42bbd");
      const response = await fetch(`${API_BASE_URL}/face_swap`, {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error("Face swap failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Face swap error:", error);
      throw error;
    }
  },

  // 獲取換臉後的圖片
  getSwappedImage: async (id: string): Promise<FaceSwapResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/images/${id}`, {
        headers: {
          Authorization: "141cd239-d83c-4188-b9f9-0ae18be42bbd",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get swapped image");
      }

      return await response.json();
    } catch (error) {
      console.error("Get swapped image error:", error);
      throw error;
    }
  },

  // 影片換臉
  swapFaceVideo: async (
    source_image: File,
    swap_video_url: string
  ): Promise<FaceSwapResponse> => {
    try {
      // 先檢查隊列大小
      await faceSwapApi.checkQueueSize();

      const formData = new FormData();
      formData.append("source_image", source_image);
      formData.append("swap_video_url", swap_video_url);
      formData.append("isfile", "true");
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "141cd239-d83c-4188-b9f9-0ae18be42bbd");
      const response = await fetch(`${API_BASE_URL}/video_face_swap`, {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error("Video face swap failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Video face swap error:", error);
      throw error;
    }
  },

  // 獲取換臉後的影片
  getSwappedVideo: async (id: string): Promise<FaceSwapResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/video/${id}`, {
        headers: {
          Authorization: "141cd239-d83c-4188-b9f9-0ae18be42bbd",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get swapped video");
      }

      return await response.json();
    } catch (error) {
      console.error("Get swapped video error:", error);
      throw error;
    }
  },
  // 圖片換臉
  swapFace_mb: async (
    source_image: File,
    swap_image_url: string
  ): Promise<FaceSwapResponse> => {
    try {
      const formData = new FormData();
      formData.append("source_image", source_image);
      formData.append("swap_image_url", swap_image_url);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "141cd239-d83c-4188-b9f9-0ae18be42bbd");
      const response = await fetch(`${API_BASE_URL}/face_swap`, {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error("Face swap failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Face swap error:", error);
      throw error;
    }
  },

  // 獲取換臉後的圖片
  getSwappedImage_mb: async (id: string): Promise<FaceSwapResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/images/${id}`, {
        headers: {
          Authorization: "141cd239-d83c-4188-b9f9-0ae18be42bbd",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get swapped image");
      }

      return await response.json();
    } catch (error) {
      console.error("Get swapped image error:", error);
      throw error;
    }
  },

  //video task rogneogamer-api.moonshine-studio.net/videotask
  // 新增檢查隊列大小的函式
  checkQueueSize: async (): Promise<boolean> => {
    try {
      let attempts = 0;
      const maxAttempts = 20; // 最多嘗試20次

      while (attempts < maxAttempts) {
        const response = await fetch(`${API_BASE_URL}/videotask`, {
          method: "GET",
        });
        const data = await response.json();
        console.log("Current queue size:", data.queue_size);

        if (data.queue_size < 4) {
          return true; // 隊列大小可接受
        }

        console.log("Queue is full, waiting 10 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 10000)); // 等待10秒
        attempts++;
      }

      throw new Error("Queue is still full after maximum attempts");
    } catch (error) {
      console.error("Error checking queue size:", error);
      throw error;
    }
  },
};
