import { NextResponse } from 'next/server';
import { query, initializeDatabase } from '@/app/lib/database';

export async function POST() {
  try {
    await initializeDatabase();

    // Sample posts data
    const samplePosts = [
      {
        title: "Welcome to Calgary Hub",
        content: "Welcome to our vibrant Calgary community platform! Here you can ask questions, share stories, and connect with fellow Calgarians. Whether you're looking for restaurant recommendations, local events, or just want to chat about life in YYC, this is your space.",
        excerpt: "Welcome to our vibrant Calgary community platform! Connect with fellow Calgarians and explore the city together.",
        image_url: "/img1.webp",
        category: "Community",
        tags: ["welcome", "community", "calgary"],
        featured: true
      },
      {
        title: "Best Places to Visit in Calgary This Winter",
        content: "Calgary transforms into a winter wonderland during the colder months. From the magical lights at the Zoo Lights event to skating at Prince's Island Park, there's no shortage of activities. Don't miss the WinSport facilities at Canada Olympic Park for some world-class skiing and snowboarding. The Bow River pathway system offers beautiful winter walks, and downtown's Plus 15 system keeps you warm while exploring.",
        excerpt: "Discover amazing winter activities and attractions that make Calgary special during the snowy season.",
        image_url: "/image-desktop.png",
        category: "Travel",
        tags: ["winter", "activities", "tourism"],
        featured: true
      },
      {
        title: "Local Food Scene: Hidden Gems in Kensington",
        content: "Kensington is a foodie paradise with incredible restaurants tucked away in every corner. From the cozy coffee shops along Kensington Road to the upscale dining experiences near the Bow River, this neighborhood has something for everyone. Try the local bakeries for fresh pastries, explore ethnic cuisines, or enjoy a craft beer at one of the local pubs.",
        excerpt: "Explore Kensington's amazing food scene with our guide to the neighborhood's best hidden restaurants.",
        image_url: "/topics.webp",
        category: "Food",
        tags: ["food", "kensington", "restaurants"],
        featured: false
      },
      {
        title: "Calgary Transit Updates and Tips",
        content: "Getting around Calgary has never been easier with recent transit improvements. The CTrain system continues to expand, with new stations and improved service. Learn about the best apps to track real-time arrivals, discover monthly pass savings, and find out about accessibility features. Plus, get insider tips on avoiding rush hour crowds and finding the best routes to popular destinations.",
        excerpt: "Stay updated on Calgary Transit improvements and get insider tips for navigating the city efficiently.",
        image_url: "/window.svg",
        category: "Transportation",
        tags: ["transit", "tips", "ctrain"],
        featured: false
      },
      {
        title: "Upcoming Events in Calgary This Month",
        content: "Calgary's event calendar is packed with exciting activities! From the Stampede grounds hosting special winter events to cultural festivals downtown, there's always something happening. Check out live music venues, art gallery openings, community meetups, and seasonal celebrations. Don't miss the farmers markets and craft fairs that showcase local artisans and producers.",
        excerpt: "Discover the hottest events and activities happening in Calgary this month.",
        image_url: "/author3.webp",
        category: "Events",
        tags: ["events", "activities", "calendar"],
        featured: false
      },
      {
        title: "Housing Market Insights: Calgary 2025",
        content: "The Calgary housing market continues to evolve with new developments and changing trends. From affordable neighborhoods perfect for first-time buyers to luxury condos downtown, understanding the market is crucial. Learn about average prices by quadrant, upcoming developments, and factors affecting the market. Get insights on the best times to buy or sell, and discover emerging neighborhoods worth watching.",
        excerpt: "Get the latest insights on Calgary's housing market trends and opportunities in 2025.",
        image_url: "/image-mobile.png",
        category: "Real Estate",
        tags: ["housing", "market", "trends"],
        featured: false
      },
      {
        title: "Best Family Activities in Calgary",
        content: "Calgary is incredibly family-friendly with activities for all ages. The Calgary Zoo offers year-round animal encounters, while Telus World of Science provides interactive learning experiences. Outdoor enthusiasts will love Fish Creek Provincial Park, one of the largest urban parks in North America. Don't forget about the numerous community centers, splash pads in summer, and skating rinks in winter.",
        excerpt: "Discover the best family-friendly activities and attractions that Calgary has to offer.",
        image_url: "/globe.svg",
        category: "Family",
        tags: ["family", "kids", "activities"],
        featured: false
      },
      {
        title: "Calgary's Tech Scene: Opportunities and Growth",
        content: "Calgary's technology sector is booming with startups and established companies creating thousands of jobs. From fintech to energy tech, the city is diversifying its economy. Learn about networking events, co-working spaces, accelerator programs, and major tech employers. Discover educational opportunities, coding bootcamps, and how to break into Calgary's thriving tech community.",
        excerpt: "Explore Calgary's growing tech sector and discover career opportunities in the industry.",
        image_url: "/file.svg",
        category: "Technology",
        tags: ["tech", "careers", "startups"],
        featured: false
      }
    ];

    // Insert each post
    for (const post of samplePosts) {
      await query(
        `INSERT INTO posts (title, content, excerpt, image_url, author_id, category, tags, featured, status, views, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        [
          post.title,
          post.content,
          post.excerpt,
          post.image_url,
          1, // Default author_id
          post.category,
          post.tags,
          post.featured,
          'published',
          Math.floor(Math.random() * 500) + 50 // Random view count
        ]
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${samplePosts.length} sample posts!`,
      count: samplePosts.length
    });

  } catch (error) {
    console.error('Seed posts error:', error);
    return NextResponse.json(
      { error: 'Failed to seed posts' },
      { status: 500 }
    );
  }
}
