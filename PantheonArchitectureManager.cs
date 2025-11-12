using UnityEngine;
using System.Collections.Generic;
using System.Collections;

// Main controller for the Pantheon reconstruction and tour system
public class PantheonReconstructionManager : MonoBehaviour
{
    [Header("Architectural Parameters - Derived from CV Analysis")]
    [SerializeField] private float pantheonDiameter = 43.3f; // meters, from historical measurements
    [SerializeField] private float domeHeight = 21.65f; // half-sphere at center
    [SerializeField] private float wallThickness = 6.2f; // massive Roman concrete walls
    [SerializeField] private float columnHeight = 12.5f; // portico columns
    [SerializeField] private float columnDiameter = 1.5f; // Corinthian columns
    [SerializeField] private int columnCount = 16; // 8 in front row, 8 behind
    [SerializeField] private float oculusRadius = 4.25f; // the famous opening
    
    [Header("Infographic Planes Configuration")]
    [SerializeField] private Material transparentPlaneMaterial;
    [SerializeField] private Texture2D[] floorPlanTextures; // Your historical drawings
    [SerializeField] private Texture2D[] sectionTextures; // Cross-sections and elevations
    [SerializeField] private Texture2D[] detailTextures; // Construction details
    
    [Header("LOD and Performance Settings")]
    [SerializeField] private int domeCofferRows = 5; // Simplified from actual 28
    [SerializeField] private int domeCofferColumns = 5; // Simplified geometry
    [SerializeField] private int columnSegments = 8; // Low-poly cylinder approximation
    
    [Header("Tour System")]
    [SerializeField] private Transform playerCamera;
    [SerializeField] private float tourMoveSpeed = 2f;
    [SerializeField] private AnimationCurve tourMovementCurve = AnimationCurve.EaseInOut(0, 0, 1, 1);
    
    // Core architectural components
    private GameObject rotunda; // The main circular chamber
    private GameObject dome; // The hemispherical vault
    private GameObject portico; // The columned entrance
    private List<GameObject> infographicPlanes = new List<GameObject>();
    private List<TourWaypoint> tourWaypoints = new List<TourWaypoint>();
    
    // Materials for different architectural elements
    private Material romanConcreteMaterial;
    private Material marbleMaterial;
    private Material bronzeMaterial;
    
    void Start()
    {
        InitializeMaterials();
        CreateArchitecturalGeometry();
        SetupInfographicPlanes();
        InitializeTourSystem();
    }
    
    void InitializeMaterials()
    {
        // Create materials that reflect Roman construction techniques
        // Roman concrete (opus caementicium) - rough, utilitarian
        romanConcreteMaterial = new Material(Shader.Find("Standard"));
        romanConcreteMaterial.color = new Color(0.6f, 0.55f, 0.5f, 1f);
        romanConcreteMaterial.metallic = 0f;
        romanConcreteMaterial.smoothness = 0.2f; // Rough concrete texture
        
        // Marble for decorative elements - smooth, refined
        marbleMaterial = new Material(Shader.Find("Standard"));
        marbleMaterial.color = new Color(0.95f, 0.93f, 0.9f, 1f);
        marbleMaterial.metallic = 0.1f;
        marbleMaterial.smoothness = 0.8f; // Polished marble
        
        // Bronze for door frames and fittings
        bronzeMaterial = new Material(Shader.Find("Standard"));
        bronzeMaterial.color = new Color(0.7f, 0.5f, 0.3f, 1f);
        bronzeMaterial.metallic = 0.9f;
        romanConcreteMaterial.smoothness = 0.6f;
        
        // Transparent material for our infographic planes
        if (transparentPlaneMaterial == null)
        {
            transparentPlaneMaterial = new Material(Shader.Find("Standard"));
            transparentPlaneMaterial.SetFloat("_Mode", 3); // Transparent mode
            transparentPlaneMaterial.color = new Color(1f, 1f, 1f, 0.8f);
            transparentPlaneMaterial.SetInt("_SrcBlend", (int)UnityEngine.Rendering.BlendMode.SrcAlpha);
            transparentPlaneMaterial.SetInt("_DstBlend", (int)UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
        }
    }
    
    void CreateArchitecturalGeometry()
    {
        // Create the main rotunda (circular chamber)
        CreateRotunda();
        
        // Build the revolutionary concrete dome
        CreateDome();
        
        // Construct the classical portico entrance
        CreatePortico();
        
        // Add architectural details that make this recognizably the Pantheon
        AddArchitecturalDetails();
    }
    
    void CreateRotunda()
    {
        // The rotunda is essentially a thick-walled cylinder
        // This represents the massive Roman concrete construction
        
        rotunda = new GameObject("Rotunda");
        rotunda.transform.parent = this.transform;
        
        // Outer cylinder (full structure)
        GameObject outerWall = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
        outerWall.transform.parent = rotunda.transform;
        outerWall.transform.localScale = new Vector3(pantheonDiameter, wallThickness, pantheonDiameter);
        outerWall.transform.position = new Vector3(0, wallThickness/2, 0);
        outerWall.GetComponent<Renderer>().material = romanConcreteMaterial;
        outerWall.name = "Outer Wall";
        
        // Inner cylinder (void space) - we'll subtract this conceptually
        // In a real implementation, you'd use CSG operations or custom mesh generation
        GameObject innerVoid = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
        innerVoid.transform.parent = rotunda.transform;
        float innerDiameter = pantheonDiameter - wallThickness;
        innerVoid.transform.localScale = new Vector3(innerDiameter, wallThickness + 0.1f, innerDiameter);
        innerVoid.transform.position = new Vector3(0, wallThickness/2, 0);
        
        // Remove the collider and renderer - this is just for reference
        Destroy(innerVoid.GetComponent<Collider>());
        innerVoid.GetComponent<Renderer>().enabled = false;
        innerVoid.name = "Interior Space Reference";
        
        // Create the floor - beautiful marble paving
        GameObject floor = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
        floor.transform.parent = rotunda.transform;
        floor.transform.localScale = new Vector3(innerDiameter, 0.1f, innerDiameter);
        floor.transform.position = new Vector3(0, 0.05f, 0);
        floor.GetComponent<Renderer>().material = marbleMaterial;
        floor.name = "Marble Floor";
    }
    
    void CreateDome()
    {
        // The Pantheon's dome is one of the greatest engineering achievements
        // We'll create a simplified version that captures its essential form
        
        dome = new GameObject("Concrete Dome");
        dome.transform.parent = this.transform;
        dome.transform.position = new Vector3(0, wallThickness, 0);
        
        // Create the basic hemispherical shape
        GameObject hemisphere = GameObject.CreatePrimitive(PrimitiveType.Sphere);
        hemisphere.transform.parent = dome.transform;
        hemisphere.transform.localScale = new Vector3(pantheonDiameter, domeHeight, pantheonDiameter);
        hemisphere.transform.position = Vector3.zero;
        hemisphere.GetComponent<Renderer>().material = romanConcreteMaterial;
        hemisphere.name = "Dome Structure";
        
        // Create the famous oculus (opening at the top)
        CreateOculus();
        
        // Add simplified coffers (decorative recessed panels)
        CreateCoffers();
    }
    
    void CreateOculus()
    {
        // The oculus is the sole light source - a masterpiece of engineering and symbolism
        GameObject oculus = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
        oculus.transform.parent = dome.transform;
        oculus.transform.localScale = new Vector3(oculusRadius * 2, 0.5f, oculusRadius * 2);
        oculus.transform.position = new Vector3(0, domeHeight - 0.25f, 0);
        
        // Make it a void by removing the mesh but keeping as reference
        oculus.GetComponent<Renderer>().enabled = false;
        oculus.name = "Oculus Opening";
        
        // Create the bronze ring that historically lined the oculus
        GameObject oculusRing = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
        oculusRing.transform.parent = oculus.transform;
        oculusRing.transform.localScale = new Vector3(1.1f, 1f, 1.1f);
        oculusRing.transform.position = Vector3.zero;
        oculusRing.GetComponent<Renderer>().material = bronzeMaterial;
        oculusRing.name = "Bronze Oculus Ring";
    }
    
    void CreateCoffers()
    {
        // Coffers served both structural and aesthetic purposes
        // They reduced the dome's weight while creating visual rhythm
        
        GameObject cofferSystem = new GameObject("Coffer System");
        cofferSystem.transform.parent = dome.transform;
        
        // Create a simplified grid of coffers
        for (int row = 0; row < domeCofferRows; row++)
        {
            for (int col = 0; col < domeCofferColumns; col++)
            {
                // Skip coffers near the oculus
                if (row >= domeCofferRows - 1) continue;
                
                GameObject coffer = GameObject.CreatePrimitive(PrimitiveType.Cube);
                coffer.transform.parent = cofferSystem.transform;
                
                // Position coffers in a radial pattern
                float angle = (col * 360f / domeCofferColumns) * Mathf.Deg2Rad;
                float radius = (row + 1) * (pantheonDiameter * 0.3f) / domeCofferRows;
                float height = domeHeight * (1f - (float)row / domeCofferRows);
                
                Vector3 cofferPos = new Vector3(
                    radius * Mathf.Cos(angle),
                    height,
                    radius * Mathf.Sin(angle)
                );
                
                coffer.transform.position = cofferPos;
                coffer.transform.localScale = new Vector3(1.5f, 0.3f, 1.5f);
                coffer.GetComponent<Renderer>().material = romanConcreteMaterial;
                coffer.name = $"Coffer_{row}_{col}";
            }
        }
    }
    
    void CreatePortico()
    {
        // The portico represents classical Greek architectural tradition
        // contrasting with the innovative Roman concrete of the rotunda
        
        portico = new GameObject("Classical Portico");
        portico.transform.parent = this.transform;
        
        // Position the portico in front of the rotunda
        Vector3 porticoPosition = new Vector3(0, 0, pantheonDiameter/2 + 5f);
        portico.transform.position = porticoPosition;
        
        // Create the triangular pediment (roof structure)
        CreatePediment();
        
        // Create the supporting columns
        CreatePorticoColumns();
        
        // Create the entablature (horizontal beam structure)
        CreateEntablature();
    }
    
    void CreatePediment()
    {
        // The pediment is the triangular decorative element above the columns
        GameObject pediment = new GameObject("Pediment");
        pediment.transform.parent = portico.transform;
        
        // Create a simple triangular prism
        // In a full implementation, this would have complex sculptural decoration
        GameObject pedimentGeometry = new GameObject("Pediment Geometry");
        MeshFilter meshFilter = pedimentGeometry.AddComponent<MeshFilter>();
        MeshRenderer meshRenderer = pedimentGeometry.AddComponent<MeshRenderer>();
        
        // Create simple triangular mesh
        Mesh pedimentMesh = new Mesh();
        Vector3[] vertices = new Vector3[6];
        vertices[0] = new Vector3(-8, 0, 0);    // Left base
        vertices[1] = new Vector3(8, 0, 0);     // Right base  
        vertices[2] = new Vector3(0, 4, 0);     // Top point
        vertices[3] = new Vector3(-8, 0, -1);   // Left base back
        vertices[4] = new Vector3(8, 0, -1);    // Right base back
        vertices[5] = new Vector3(0, 4, -1);    // Top point back
        
        int[] triangles = new int[] {
            0, 2, 1,  // Front face
            3, 4, 5,  // Back face  
            0, 1, 4, 0, 4, 3,  // Bottom
            0, 3, 5, 0, 5, 2,  // Left side
            1, 2, 5, 1, 5, 4   // Right side
        };
        
        pedimentMesh.vertices = vertices;
        pedimentMesh.triangles = triangles;
        pedimentMesh.RecalculateNormals();
        
        meshFilter.mesh = pedimentMesh;
        meshRenderer.material = marbleMaterial;
        pedimentGeometry.transform.parent = pediment.transform;
        pedimentGeometry.transform.position = new Vector3(0, columnHeight + 2, 0);
    }
    
    void CreatePorticoColumns()
    {
        // Create the iconic Corinthian columns of the portico
        GameObject columnSystem = new GameObject("Column System");
        columnSystem.transform.parent = portico.transform;
        
        // Front row of columns
        for (int i = 0; i < 8; i++)
        {
            GameObject column = CreateSingleColumn($"Front_Column_{i}");
            column.transform.parent = columnSystem.transform;
            
            float spacing = 16f / 7f; // Spacing between columns
            float xPos = -8f + (i * spacing);
            column.transform.position = new Vector3(xPos, columnHeight/2, 0);
        }
        
        // Back row of columns (partially visible through front row)
        for (int i = 0; i < 8; i++)
        {
            GameObject column = CreateSingleColumn($"Back_Column_{i}");
            column.transform.parent = columnSystem.transform;
            
            float spacing = 16f / 7f;
            float xPos = -8f + (i * spacing);
            column.transform.position = new Vector3(xPos, columnHeight/2, -4f);
        }
    }
    
    GameObject CreateSingleColumn(string columnName)
    {
        GameObject column = new GameObject(columnName);
        
        // Column shaft (main cylindrical body)
        GameObject shaft = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
        shaft.transform.parent = column.transform;
        shaft.transform.localScale = new Vector3(columnDiameter, columnHeight, columnDiameter);
        shaft.GetComponent<Renderer>().material = marbleMaterial;
        shaft.name = "Column Shaft";
        
        // Capital (decorative top) - simplified representation of Corinthian style
        GameObject capital = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
        capital.transform.parent = column.transform;
        capital.transform.localScale = new Vector3(columnDiameter * 1.3f, 0.8f, columnDiameter * 1.3f);
        capital.transform.position = new Vector3(0, columnHeight/2 + 0.4f, 0);
        capital.GetComponent<Renderer>().material = marbleMaterial;
        capital.name = "Corinthian Capital";
        
        // Base (foundation of column)
        GameObject baseElement = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
        baseElement.transform.parent = column.transform;
        baseElement.transform.localScale = new Vector3(columnDiameter * 1.2f, 0.5f, columnDiameter * 1.2f);
        baseElement.transform.position = new Vector3(0, -columnHeight/2 - 0.25f, 0);
        baseElement.GetComponent<Renderer>().material = marbleMaterial;
        baseElement.name = "Column Base";
        
        return column;
    }
    
    void CreateEntablature()
    {
        // The entablature is the horizontal beam structure above the columns
        GameObject entablature = new GameObject("Entablature");
        entablature.transform.parent = portico.transform;
        
        GameObject beam = GameObject.CreatePrimitive(PrimitiveType.Cube);
        beam.transform.parent = entablature.transform;
        beam.transform.localScale = new Vector3(18f, 1.5f, 5f);
        beam.transform.position = new Vector3(0, columnHeight + 0.75f, -2f);
        beam.GetComponent<Renderer>().material = marbleMaterial;
        beam.name = "Main Entablature Beam";
    }
    
    void AddArchitecturalDetails()
    {
        // Add the main entrance doorway
        GameObject doorway = GameObject.CreatePrimitive(PrimitiveType.Cube);
        doorway.transform.parent = this.transform;
        doorway.transform.localScale = new Vector3(4f, 8f, 1f);
        doorway.transform.position = new Vector3(0, 4f, pantheonDiameter/2 - 0.5f);
        doorway.GetComponent<Renderer>().material = bronzeMaterial;
        doorway.name = "Bronze Doors";
        
        // Add interior niches (alcoves for statues)
        CreateInteriorNiches();
    }
    
    void CreateInteriorNiches()
    {
        GameObject nicheSystem = new GameObject("Interior Niches");
        nicheSystem.transform.parent = this.transform;
        
        // Create 8 niches around the interior wall
        for (int i = 0; i < 8; i++)
        {
            GameObject niche = GameObject.CreatePrimitive(PrimitiveType.Cube);
            niche.transform.parent = nicheSystem.transform;
            
            float angle = i * 45f * Mathf.Deg2Rad;
            float radius = (pantheonDiameter - wallThickness) / 2 - 1f;
            
            Vector3 nichePos = new Vector3(
                radius * Mathf.Cos(angle),
                wallThickness * 0.6f,
                radius * Mathf.Sin(angle)
            );
            
            niche.transform.position = nichePos;
            niche.transform.localScale = new Vector3(2f, 4f, 1f);
            niche.transform.LookAt(Vector3.zero);
            niche.GetComponent<Renderer>().material = marbleMaterial;
            niche.name = $"Niche_{i}";
        }
    }
    
    void SetupInfographicPlanes()
    {
        // Create transparent planes that display your historical drawings
        // These serve as floating "information panels" throughout the space
        
        CreateFloorPlanDisplays();
        CreateSectionDisplays();
        CreateDetailDisplays();
    }
    
    void CreateFloorPlanDisplays()
    {
        // Position floor plan drawings as horizontal planes visitors can view from above
        for (int i = 0; i < floorPlanTextures.Length && i < 3; i++) // Limit to 3 for performance
        {
            if (floorPlanTextures[i] == null) continue;
            
            GameObject planePlane = GameObject.CreatePrimitive(PrimitiveType.Plane);
            planePlane.transform.parent = this.transform;
            
            // Position at different heights for layered viewing
            Vector3 planePosition = new Vector3(-15f + (i * 10f), wallThickness + 5f + (i * 2f), 0);
            planePlane.transform.position = planePosition;
            planePlane.transform.localScale = new Vector3(8f, 1f, 8f); // Large enough to read details
            
            // Apply the historical drawing as texture
            Material planeMaterial = new Material(transparentPlaneMaterial);
            planeMaterial.mainTexture = floorPlanTextures[i];
            planePlane.GetComponent<Renderer>().material = planeMaterial;
            
            planePlane.name = $"Floor Plan Display {i + 1}";
            infographicPlanes.Add(planePlane);
            
            // Add a waypoint for the tour system
            TourWaypoint waypoint = planePlane.AddComponent<TourWaypoint>();
            waypoint.waypointName = $"Floor Plan Analysis {i + 1}";
            waypoint.description = "Historical floor plan showing the precise geometry and proportional relationships of the Pantheon.";
            tourWaypoints.Add(waypoint);
        }
    }
    
    void CreateSectionDisplays()
    {
        // Position section drawings as vertical planes showing construction details
        for (int i = 0; i < sectionTextures.Length && i < 2; i++)
        {
            if (sectionTextures[i] == null) continue;
            
            GameObject sectionPlane = GameObject.CreatePrimitive(PrimitiveType.Plane);
            sectionPlane.transform.parent = this.transform;
            
            // Position sections to show relationship to actual structure
            Vector3 planePosition = new Vector3(0, wallThickness, -25f - (i * 8f));
            sectionPlane.transform.position = planePosition;
            sectionPlane.transform.rotation = Quaternion.Euler(90f, 0, 0); // Vertical orientation
            sectionPlane.transform.localScale = new Vector3(12f, 1f, 8f);
            
            Material sectionMaterial = new Material(transparentPlaneMaterial);
            sectionMaterial.mainTexture = sectionTextures[i];
            sectionPlane.GetComponent<Renderer>().material = sectionMaterial;
            
            sectionPlane.name = $"Section Display {i + 1}";
            infographicPlanes.Add(sectionPlane);
            
            TourWaypoint waypoint = sectionPlane.AddComponent<TourWaypoint>();
            waypoint.waypointName = $"Construction Analysis {i + 1}";
            waypoint.description = "Cross-sectional view revealing the innovative Roman concrete construction techniques.";
            tourWaypoints.Add(waypoint);
        }
    }
    
    void CreateDetailDisplays()
    {
        // Create smaller planes for architectural details and construction diagrams
        for (int i = 0; i < detailTextures.Length && i < 4; i++)
        {
            if (detailTextures[i] == null) continue;
            
            GameObject detailPlane = GameObject.CreatePrimitive(PrimitiveType.Plane);
            detailPlane.transform.parent = this.transform;
            
            // Scatter detail displays around the perimeter
            float angle = i * 90f * Mathf.Deg2Rad;
            float radius = pantheonDiameter * 0.7f;
            Vector3 planePosition = new Vector3(
                radius * Mathf.Cos(angle),
                wallThickness * 0.8f,
                radius * Mathf.Sin(angle)
            );
            
            detailPlane.transform.position = planePosition;
            detailPlane.transform.LookAt(Vector3.zero); // Face toward center
            detailPlane.transform.localScale = new Vector3(4f, 1f, 3f);
            
            Material detailMaterial = new Material(transparentPlaneMaterial);
            detailMaterial.mainTexture = detailTextures[i];
            detailPlane.GetComponent<Renderer>().material = detailMaterial;
            
            detailPlane.name = $"Detail Display {i + 1}";
            infographicPlanes.Add(detailPlane);
        }
    }
    
    void InitializeTourSystem()
    {
        // Set up waypoints for guided tour experience
        CreateCentralViewpoint();
        CreateOculusViewpoint();
        CreatePorticoViewpoint();
        
        // Start the tour if camera is assigned
        if (playerCamera != null && tourWaypoints.Count > 0)
        {
            StartCoroutine(AutomaticTour());
        }
    }
    
    void CreateCentralViewpoint()
    {
        GameObject centralPoint = new GameObject("Central Viewpoint");
        centralPoint.transform.parent = this.transform;
        centralPoint.transform.position = new Vector3(0, 3f, 0);
        
        TourWaypoint waypoint = centralPoint.AddComponent<TourWaypoint>();
        waypoint.waypointName = "Center of the Universe";
        waypoint.description = "Standing at the center of the Pantheon, experience the perfect harmony of the sphere and cube - the dome's radius equals the building's height.";
        waypoint.lookTarget = new Vector3(0, domeHeight, 0); // Look up at oculus
        tourWaypoints.Insert(0, waypoint); // Make this the first stop
    }
    
    void CreateOculusViewpoint()
    {
        GameObject oculusPoint = new GameObject("Oculus Viewpoint");
        oculusPoint.transform.parent = this.transform;
        oculusPoint.transform.position = new Vector3(0, wallThickness - 2f, 0);
        
        TourWaypoint waypoint = oculusPoint.AddComponent<TourWaypoint>();
        waypoint.waypointName = "The Eye of Heaven";
        waypoint.description = "The oculus - 27 feet in diameter - is the only source of light, creating a connection between earth and sky that changes throughout the day.";
        waypoint.lookTarget = new Vector3(0, domeHeight + 5f, 0); // Look through oculus to sky
        tourWaypoints.Add(waypoint);
    }
    
    void CreatePorticoViewpoint()
    {
        GameObject porticoPoint = new GameObject("Portico Viewpoint");
        porticoPoint.transform.parent = this.transform;
        porticoPoint.transform.position = new Vector3(0, 2f, pantheonDiameter/2 + 15f);
        
        TourWaypoint waypoint = porticoPoint.AddComponent<TourWaypoint>();
        waypoint.waypointName = "Classical Facade";
        waypoint.description = "The portico represents Greek architectural tradition - a classical temple front concealing the revolutionary Roman engineering within.";
        waypoint.lookTarget = new Vector3(0, columnHeight/2, pantheonDiameter/2 + 5f);
        tourWaypoints.Add(waypoint);
    }
    
    IEnumerator AutomaticTour()
    {
        // Automatic tour that moves between waypoints
        yield return new WaitForSeconds(2f); // Initial pause
        
        for (int i = 0; i < tourWaypoints.Count; i++)
        {
            yield return StartCoroutine(MoveToWaypoint(tourWaypoints[i]));
            yield return new WaitForSeconds(8f); // Pause at each waypoint for observation
        }
        
        Debug.Log("Tour completed. Manual exploration enabled.");
    }
    
    IEnumerator MoveToWaypoint(TourWaypoint waypoint)
    {
        Vector3 startPosition = playerCamera.position;
        Vector3 targetPosition = waypoint.transform.position;
        
        Quaternion startRotation = playerCamera.rotation;
        Vector3 lookDirection = (waypoint.lookTarget - targetPosition).normalized;
        Quaternion targetRotation = Quaternion.LookRotation(lookDirection);
        
        float journey = 0f;
        float journeyTime = Vector3.Distance(startPosition, targetPosition) / tourMoveSpeed;
        
        while (journey < journeyTime)
        {
            journey += Time.deltaTime;
            float fractionOfJourney = journey / journeyTime;
            float smoothedFraction = tourMovementCurve.Evaluate(fractionOfJourney);
            
            // Smooth camera movement using the animation curve
            playerCamera.position = Vector3.Lerp(startPosition, targetPosition, smoothedFraction);
            playerCamera.rotation = Quaternion.Lerp(startRotation, targetRotation, smoothedFraction);
            
            yield return null;
        }
        
        Debug.Log($"Arrived at: {waypoint.waypointName} - {waypoint.description}");
    }
    
    // Public methods for external control
    public void ToggleInfographicVisibility()
    {
        foreach (GameObject plane in infographicPlanes)
        {
            plane.SetActive(!plane.activeSelf);
        }
    }
    
    public void SetLODLevel(int lodLevel)
    {
        // Adjust level of detail based on performance needs
        switch (lodLevel)
        {
            case 0: // Highest detail
                domeCofferRows = 7;
                domeCofferColumns = 12;
                columnSegments = 16;
                break;
            case 1: // Medium detail
                domeCofferRows = 5;
                domeCofferColumns = 8;
                columnSegments = 12;
                break;
            case 2: // Low detail (default)
                domeCofferRows = 3;
                domeCofferColumns = 6;
                columnSegments = 8;
                break;
        }
        
        // Rebuild geometry with new LOD settings
        DestroyImmediate(dome);
        CreateDome();
    }
}

// Component for tour waypoints
[System.Serializable]
public class TourWaypoint : MonoBehaviour
{
    public string waypointName;
    public string description;
    public Vector3 lookTarget;
    
    void OnDrawGizmos()
    {
        // Visualize waypoints in scene view
        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(transform.position, 0.5f);
        
        Gizmos.color = Color.red;
        Gizmos.DrawLine(transform.position, lookTarget);
    }
}

// Helper component for managing the infographic display system
public class InfographicController : MonoBehaviour
{
    [Header("Interactive Display Settings")]
    [SerializeField] private LayerMask infographicLayer = 1 << 8; // Assign infographics to layer 8
    [SerializeField] private float fadeSpeed = 2f;
    [SerializeField] private float hoverScale = 1.1f;
    
    private Camera playerCamera;
    private GameObject currentlyHovered = null;
    private Vector3 originalScale;
    
    void Start()
    {
        playerCamera = Camera.main;
        if (playerCamera == null)
            playerCamera = FindObjectOfType<Camera>();
            
        SetupInfographicInteractivity();
    }
    
    void Update()
    {
        HandleInfographicInteraction();
    }
    
    void SetupInfographicInteractivity()
    {
        // Find all infographic planes and set them up for interaction
        GameObject[] infographics = GameObject.FindGameObjectsWithTag("Infographic");
        
        foreach (GameObject infographic in infographics)
        {
            // Add collider for mouse interaction if not present
            if (infographic.GetComponent<Collider>() == null)
            {
                BoxCollider collider = infographic.AddComponent<BoxCollider>();
                collider.isTrigger = true;
            }
            
            // Set layer for selective interaction
            infographic.layer = Mathf.RoundToInt(Mathf.Log(infographicLayer.value, 2));
            
            // Add info display component
            InfoDisplay infoDisplay = infographic.GetComponent<InfoDisplay>();
            if (infoDisplay == null)
            {
                infoDisplay = infographic.AddComponent<InfoDisplay>();
            }
        }
    }
    
    void HandleInfographicInteraction()
    {
        // Raycast from camera to detect infographic hover
        Ray ray = playerCamera.ScreenPointToRay(Input.mousePosition);
        RaycastHit hit;
        
        if (Physics.Raycast(ray, out hit, 100f, infographicLayer))
        {
            GameObject hitObject = hit.collider.gameObject;
            
            if (currentlyHovered != hitObject)
            {
                // Reset previous hover state
                if (currentlyHovered != null)
                {
                    ResetInfographicScale(currentlyHovered);
                }
                
                // Set new hover state
                currentlyHovered = hitObject;
                originalScale = hitObject.transform.localScale;
                StartCoroutine(ScaleInfographic(hitObject, originalScale * hoverScale));
                
                // Show info panel
                InfoDisplay infoDisplay = hitObject.GetComponent<InfoDisplay>();
                if (infoDisplay != null)
                {
                    infoDisplay.ShowInfo();
                }
            }
            
            // Handle click interaction
            if (Input.GetMouseButtonDown(0))
            {
                FocusOnInfographic(hitObject);
            }
        }
        else
        {
            // No infographic hovered, reset current if exists
            if (currentlyHovered != null)
            {
                ResetInfographicScale(currentlyHovered);
                
                InfoDisplay infoDisplay = currentlyHovered.GetComponent<InfoDisplay>();
                if (infoDisplay != null)
                {
                    infoDisplay.HideInfo();
                }
                
                currentlyHovered = null;
            }
        }
    }
    
    void ResetInfographicScale(GameObject infographic)
    {
        StartCoroutine(ScaleInfographic(infographic, originalScale));
    }
    
    IEnumerator ScaleInfographic(GameObject infographic, Vector3 targetScale)
    {
        Vector3 startScale = infographic.transform.localScale;
        float elapsedTime = 0f;
        float scaleTime = 0.3f;
        
        while (elapsedTime < scaleTime)
        {
            elapsedTime += Time.deltaTime;
            float progress = elapsedTime / scaleTime;
            progress = Mathf.SmoothStep(0f, 1f, progress); // Smooth scaling
            
            infographic.transform.localScale = Vector3.Lerp(startScale, targetScale, progress);
            yield return null;
        }
        
        infographic.transform.localScale = targetScale;
    }
    
    void FocusOnInfographic(GameObject infographic)
    {
        // Move camera to optimal viewing position for the selected infographic
        Vector3 optimalPosition = infographic.transform.position + (infographic.transform.forward * -8f);
        optimalPosition.y = infographic.transform.position.y;
        
        StartCoroutine(SmoothCameraMove(optimalPosition, infographic.transform.position));
    }
    
    IEnumerator SmoothCameraMove(Vector3 targetPosition, Vector3 lookTarget)
    {
        Vector3 startPosition = playerCamera.transform.position;
        Quaternion startRotation = playerCamera.transform.rotation;
        
        Vector3 lookDirection = (lookTarget - targetPosition).normalized;
        Quaternion targetRotation = Quaternion.LookRotation(lookDirection);
        
        float moveTime = 2f;
        float elapsedTime = 0f;
        
        while (elapsedTime < moveTime)
        {
            elapsedTime += Time.deltaTime;
            float progress = elapsedTime / moveTime;
            progress = Mathf.SmoothStep(0f, 1f, progress);
            
            playerCamera.transform.position = Vector3.Lerp(startPosition, targetPosition, progress);
            playerCamera.transform.rotation = Quaternion.Lerp(startRotation, targetRotation, progress);
            
            yield return null;
        }
    }
}

// Component for displaying information about each infographic
public class InfoDisplay : MonoBehaviour
{
    [Header("Info Panel Settings")]
    [SerializeField] private GameObject infoPanelPrefab;
    [SerializeField] private string infoTitle = "Historical Drawing";
    [SerializeField] private string infoDescription = "Detailed architectural documentation";
    [SerializeField] private string historicalContext = "";
    [SerializeField] private int drawingYear = 1800;
    [SerializeField] private string architect = "Unknown";
    
    private GameObject infoPanel;
    private Canvas worldCanvas;
    
    void Start()
    {
        CreateInfoPanel();
    }
    
    void CreateInfoPanel()
    {
        // Create world-space canvas for info display
        GameObject canvasObject = new GameObject("Info Canvas");
        canvasObject.transform.parent = this.transform;
        canvasObject.transform.localPosition = new Vector3(0, 2f, 0);
        
        worldCanvas = canvasObject.AddComponent<Canvas>();
        worldCanvas.renderMode = RenderMode.WorldSpace;
        worldCanvas.worldCamera = Camera.main;
        
        // Scale the canvas appropriately
        canvasObject.transform.localScale = new Vector3(0.01f, 0.01f, 0.01f);
        
        // Create info panel UI
        CreateInfoPanelUI();
        
        // Initially hidden
        infoPanel.SetActive(false);
    }
    
    void CreateInfoPanelUI()
    {
        // Background panel
        infoPanel = new GameObject("Info Panel");
        infoPanel.transform.parent = worldCanvas.transform;
        
        UnityEngine.UI.Image background = infoPanel.AddComponent<UnityEngine.UI.Image>();
        background.color = new Color(0, 0, 0, 0.8f);
        
        RectTransform panelRect = infoPanel.GetComponent<RectTransform>();
        panelRect.sizeDelta = new Vector2(400, 200);
        panelRect.anchoredPosition = Vector2.zero;
        
        // Title text
        GameObject titleObject = new GameObject("Title");
        titleObject.transform.parent = infoPanel.transform;
        
        UnityEngine.UI.Text titleText = titleObject.AddComponent<UnityEngine.UI.Text>();
        titleText.text = infoTitle;
        titleText.font = Resources.GetBuiltinResource<Font>("Arial.ttf");
        titleText.fontSize = 18;
        titleText.color = Color.white;
        titleText.alignment = TextAnchor.MiddleCenter;
        
        RectTransform titleRect = titleObject.GetComponent<RectTransform>();
        titleRect.anchorMin = new Vector2(0, 0.7f);
        titleRect.anchorMax = new Vector2(1, 1);
        titleRect.offsetMin = new Vector2(10, 0);
        titleRect.offsetMax = new Vector2(-10, -10);
        
        // Description text
        GameObject descObject = new GameObject("Description");
        descObject.transform.parent = infoPanel.transform;
        
        UnityEngine.UI.Text descText = descObject.AddComponent<UnityEngine.UI.Text>();
        descText.text = $"{infoDescription}\n\nArchitect: {architect}\nYear: {drawingYear}\n\n{historicalContext}";
        descText.font = Resources.GetBuiltinResource<Font>("Arial.ttf");
        descText.fontSize = 12;
        descText.color = Color.white;
        descText.alignment = TextAnchor.UpperLeft;
        
        RectTransform descRect = descObject.GetComponent<RectTransform>();
        descRect.anchorMin = new Vector2(0, 0);
        descRect.anchorMax = new Vector2(1, 0.7f);
        descRect.offsetMin = new Vector2(10, 10);
        descRect.offsetMax = new Vector2(-10, 0);
    }
    
    public void ShowInfo()
    {
        if (infoPanel != null)
        {
            infoPanel.SetActive(true);
            StartCoroutine(FadeInPanel());
        }
    }
    
    public void HideInfo()
    {
        if (infoPanel != null)
        {
            StartCoroutine(FadeOutPanel());
        }
    }
    
    IEnumerator FadeInPanel()
    {
        CanvasGroup canvasGroup = infoPanel.GetComponent<CanvasGroup>();
        if (canvasGroup == null)
            canvasGroup = infoPanel.AddComponent<CanvasGroup>();
        
        canvasGroup.alpha = 0f;
        float fadeTime = 0.3f;
        float elapsedTime = 0f;
        
        while (elapsedTime < fadeTime)
        {
            elapsedTime += Time.deltaTime;
            canvasGroup.alpha = Mathf.Lerp(0f, 1f, elapsedTime / fadeTime);
            yield return null;
        }
        
        canvasGroup.alpha = 1f;
    }
    
    IEnumerator FadeOutPanel()
    {
        CanvasGroup canvasGroup = infoPanel.GetComponent<CanvasGroup>();
        if (canvasGroup == null) yield break;
        
        float fadeTime = 0.3f;
        float elapsedTime = 0f;
        float startAlpha = canvasGroup.alpha;
        
        while (elapsedTime < fadeTime)
        {
            elapsedTime += Time.deltaTime;
            canvasGroup.alpha = Mathf.Lerp(startAlpha, 0f, elapsedTime / fadeTime);
            yield return null;
        }
        
        canvasGroup.alpha = 0f;
        infoPanel.SetActive(false);
    }
}

// Advanced lighting system to simulate the famous Pantheon lighting effects
public class PantheonLightingSystem : MonoBehaviour
{
    [Header("Natural Lighting Simulation")]
    [SerializeField] private Light sunlight;
    [SerializeField] private AnimationCurve lightIntensityCurve = AnimationCurve.EaseInOut(0, 0.2f, 1, 1.2f);
    [SerializeField] private Gradient lightColorGradient;
    [SerializeField] private float dayDuration = 120f; // 2 minutes = full day cycle
    
    [Header("Oculus Effects")]
    [SerializeField] private Transform oculusCenter;
    [SerializeField] private GameObject lightShaftPrefab;
    [SerializeField] private ParticleSystem dustParticles;
    
    private float currentTimeOfDay = 0.5f; // Start at noon
    private GameObject currentLightShaft;
    
    void Start()
    {
        SetupLighting();
        CreateLightShaft();
        SetupDustParticles();
    }
    
    void Update()
    {
        SimulateDayLightCycle();
        UpdateOculusEffects();
    }
    
    void SetupLighting()
    {
        if (sunlight == null)
        {
            // Create main directional light if not assigned
            GameObject lightObject = new GameObject("Pantheon Sunlight");
            sunlight = lightObject.AddComponent<Light>();
            sunlight.type = LightType.Directional;
            sunlight.shadows = LightShadows.Soft;
        }
        
        // Set up color gradient for different times of day
        if (lightColorGradient.colorKeys.Length == 0)
        {
            GradientColorKey[] colorKeys = new GradientColorKey[4];
            colorKeys[0] = new GradientColorKey(new Color(1f, 0.6f, 0.4f), 0f); // Dawn
            colorKeys[1] = new GradientColorKey(Color.white, 0.5f); // Noon
            colorKeys[2] = new GradientColorKey(new Color(1f, 0.8f, 0.6f), 0.75f); // Sunset
            colorKeys[3] = new GradientColorKey(new Color(0.3f, 0.3f, 0.5f), 1f); // Night
            
            GradientAlphaKey[] alphaKeys = new GradientAlphaKey[2];
            alphaKeys[0] = new GradientAlphaKey(1f, 0f);
            alphaKeys[1] = new GradientAlphaKey(1f, 1f);
            
            lightColorGradient.SetKeys(colorKeys, alphaKeys);
        }
    }
    
    void SimulateDayLightCycle()
    {
        // Advance time
        currentTimeOfDay += Time.deltaTime / dayDuration;
        if (currentTimeOfDay > 1f) currentTimeOfDay = 0f;
        
        // Update sun position (simulate movement across sky through oculus)
        float sunAngle = (currentTimeOfDay - 0.5f) * 180f; // -90 to +90 degrees
        sunlight.transform.rotation = Quaternion.Euler(sunAngle, 0, 0);
        
        // Update light intensity and color
        sunlight.intensity = lightIntensityCurve.Evaluate(currentTimeOfDay);
        sunlight.color = lightColorGradient.Evaluate(currentTimeOfDay);
        
        // Update ambient lighting
        RenderSettings.ambientLight = lightColorGradient.Evaluate(currentTimeOfDay) * 0.3f;
    }
    
    void CreateLightShaft()
    {
        // Create dramatic light shaft coming through the oculus
        if (lightShaftPrefab == null)
        {
            currentLightShaft = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
            currentLightShaft.name = "Oculus Light Shaft";
            
            // Remove collider and set up for light effect
            Destroy(currentLightShaft.GetComponent<Collider>());
            
            // Create light shaft material
            Material lightShaftMaterial = new Material(Shader.Find("Standard"));
            lightShaftMaterial.SetFloat("_Mode", 3); // Transparent
            lightShaftMaterial.color = new Color(1f, 1f, 0.9f, 0.1f);
            lightShaftMaterial.SetInt("_SrcBlend", (int)UnityEngine.Rendering.BlendMode.SrcAlpha);
            lightShaftMaterial.SetInt("_DstBlend", (int)UnityEngine.Rendering.BlendMode.One);
            lightShaftMaterial.EnableKeyword("_ALPHABLEND_ON");
            
            currentLightShaft.GetComponent<Renderer>().material = lightShaftMaterial;
        }
        else
        {
            currentLightShaft = Instantiate(lightShaftPrefab);
        }
        
        currentLightShaft.transform.parent = this.transform;
    }
    
    void UpdateOculusEffects()
    {
        if (currentLightShaft == null || oculusCenter == null) return;
        
        // Position and scale light shaft based on sun angle
        Vector3 sunDirection = sunlight.transform.forward;
        float lightShaftLength = 20f;
        
        // Position shaft coming down through oculus
        Vector3 shaftPosition = oculusCenter.position + (sunDirection * lightShaftLength * 0.5f);
        currentLightShaft.transform.position = shaftPosition;
        
        // Rotate to align with sun direction
        currentLightShaft.transform.rotation = Quaternion.FromToRotation(Vector3.up, sunDirection);
        
        // Scale based on light intensity
        float intensity = sunlight.intensity;
        currentLightShaft.transform.localScale = new Vector3(
            8f * intensity, // Diameter of light shaft
            lightShaftLength,
            8f * intensity
        );
        
        // Update material opacity based on light intensity
        Material shaftMaterial = currentLightShaft.GetComponent<Renderer>().material;
        Color shaftColor = sunlight.color;
        shaftColor.a = 0.05f + (intensity * 0.1f);
        shaftMaterial.color = shaftColor;
    }
    
    void SetupDustParticles()
    {
        if (dustParticles == null && oculusCenter != null)
        {
            GameObject particleObject = new GameObject("Dust Particles");
            particleObject.transform.parent = oculusCenter;
            particleObject.transform.localPosition = Vector3.zero;
            
            dustParticles = particleObject.AddComponent<ParticleSystem>();
            
            // Configure particle system for atmospheric dust effect
            var main = dustParticles.main;
            main.startLifetime = 10f;
            main.startSpeed = 0.5f;
            main.startSize = 0.02f;
            main.startColor = new Color(1f, 1f, 0.9f, 0.3f);
            main.maxParticles = 200;
            
            var emission = dustParticles.emission;
            emission.rateOverTime = 20f;
            
            var shape = dustParticles.shape;
            shape.shapeType = ParticleSystemShapeType.Circle;
            shape.radius = 4f;
            
            var velocityOverLifetime = dustParticles.velocityOverLifetime;
            velocityOverLifetime.enabled = true;
            velocityOverLifetime.space = ParticleSystemSimulationSpace.Local;
            velocityOverLifetime.y = new ParticleSystem.MinMaxCurve(-2f, -1f);
        }
    }
    
    // Public methods for external control
    public void SetTimeOfDay(float time)
    {
        currentTimeOfDay = Mathf.Clamp01(time);
    }
    
    public void ToggleLightShaft()
    {
        if (currentLightShaft != null)
        {
            currentLightShaft.SetActive(!currentLightShaft.activeSelf);
        }
    }
}


