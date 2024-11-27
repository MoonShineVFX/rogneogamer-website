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
};
